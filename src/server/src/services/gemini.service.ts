import { HttpException } from '@/exceptions/HttpException';
import { CodeChange, GeminiConfig, GeminiResReviewPR } from '@/interfaces/gemini.interface';
import { logger } from '@/utils/logger';
import { formatUnifiedDiffWithLineNumbers } from '@/utils/util';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Service } from 'typedi';

@Service()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private config: GeminiConfig;

  constructor() {
    this.init();
  }

  private async init() {
    this.config = {
      apiKey: process.env.GEMINI_TOKEN,
      model: 'gemini-1.5-flash',
      maxTokens: 8192,
      temperature: 0.7,
    };

    if (!this.config.apiKey) {
      throw new HttpException(500, 'Gemini API key is not configured');
    }

    this.genAI = new GoogleGenerativeAI(this.config.apiKey);
  }

  /**
   * Dùng để tạo nội dung cho bài viết
   * @param prompt - The prompt to generate text
   * @returns The generated text
   */
  public async generateText(prompt: string) {
    const model = this.genAI.getGenerativeModel({
      model: this.config.model,
      generationConfig: {
        maxOutputTokens: this.config.maxTokens,
        temperature: this.config.temperature,
      },
    });
    const result = await model.generateContent(prompt);

    return result.response.text();
  }

  public async evaluateCodeWithPrompt(pr_description: string, code: CodeChange[]): Promise<GeminiResReviewPR> {
    const model = this.genAI.getGenerativeModel({
      model: this.config.model,
      generationConfig: {
        maxOutputTokens: this.config.maxTokens,
        temperature: this.config.temperature,
      },
    });

    const prompt = this.buildPromptReviewPullRequest(pr_description, code);

    logger.info(prompt);

    const result = await model.generateContent(prompt);

    logger.info(result.response.text());

    return this.parseEvaluationResponse(result.response.text());
  }

  private buildPromptReviewPullRequest(pr_description: string, code_changes: CodeChange[]) {
    const formattedCodeChanges = code_changes
      .map(change => {
        const numberedLines = formatUnifiedDiffWithLineNumbers(change.code);
        return `File: ${change.file}:\n${numberedLines}`;
      })
      .join('\n\n---\n\n');

    return `
    Bạn là một chuyên gia review mã nguồn, được giao nhiệm vụ đánh giá một Pull Request (PR) trên GitHub.
Dưới đây là thông tin về PR:

Mô tả PR:
${pr_description}

Thay đổi mã nguồn:
${formattedCodeChanges}

Yêu cầu đánh giá:

Hãy phân tích kỹ các thay đổi và phản hồi theo định dạng JSON với các nội dung sau:
1. summary: Một tiêu đề ngắn tóm tắt nội dung PR.
2. comments: Danh sách các nhận xét chi tiết cho từng dòng mã cần góp ý.

Chỉ đưa ra nhận xét nếu:
- Dòng mã có lỗi logic, bug, hoặc vấn đề bảo mật.
- Có thể cải thiện về hiệu suất, khả năng bảo trì, hoặc độ dễ đọc.
- Thiếu xử lý lỗi hoặc chưa đáp ứng đủ yêu cầu chức năng.

Không đưa ra nhận xét nếu:
- Nội dung không liên quan đến code.
- Thay đổi nhỏ, hiển nhiên hoặc không cần thiết.

Định dạng phản hồi:
Bạn phải trả về một đối tượng JSON hợp lệ với cấu trúc sau:
{
  "summary": "Tóm tắt ngắn gọn về nội dung PR (Không quá 255 kí tự)",
  "score": 0-10,
  "comments": [
    {
      "file": "path/to/file.ext",
      "line": 42,
      "comment": "[🤖 AI Review] (Mức độ: Nhận xét, gợi ý, cải thiện, lỗi, bug, vấn đề bảo mật, ...) Nhận xét rõ ràng và cụ thể về đoạn mã"
    },
    ...thêm nhận xét (Không quá 1000 kí tự)
  ]
}

QUAN TRỌNG:
- Khi đề cập đến code trong comment, hãy escape tất cả dấu quotes: \" thay vì "
- Ví dụ: thay vì href="/", hãy viết href=\"/\"
- Đảm bảo JSON hoàn toàn hợp lệ, không có dấu quotes chưa được escape
- Không thêm bất kỳ văn bản, markdown hay giải thích nào bên ngoài JSON.
    `;
  }

  /**
   * Fix common JSON escape issues in AI response
   * @param jsonText - The JSON text to fix
   * @returns Fixed JSON text
   */
  private fixJsonEscapeIssues(jsonText: string): string {
    try {
      // Đầu tiên thử parse để xem có lỗi không
      JSON.parse(jsonText);
      return jsonText; // Nếu parse được thì return luôn
    } catch (error) {
      logger.info('JSON parsing failed, attempting to fix escape issues...');

      // Nếu có lỗi, thử fix các vấn đề thường gặp
      let fixedText = jsonText;

      // Fix quotes trong comment values - approach an toàn hơn
      fixedText = fixedText.replace(/"comment":\s*"((?:[^"\\]|\\.)*)"/g, (match, commentContent) => {
        // Tạm thời replace escaped quotes với placeholder
        let tempContent = commentContent.replace(/\\"/g, '__ESCAPED_QUOTE__');

        // Escape unescaped quotes
        tempContent = tempContent.replace(/"/g, '\\"');

        // Restore escaped quotes
        tempContent = tempContent.replace(/__ESCAPED_QUOTE__/g, '\\"');

        return `"comment": "${tempContent}"`;
      });

      // Fix các trường hợp khác nếu cần
      try {
        JSON.parse(fixedText);
        logger.info('Successfully fixed JSON escape issues');
        return fixedText;
      } catch (secondError) {
        // Nếu vẫn không fix được, return original
        logger.warn('Could not fix JSON escape issues:', secondError);
        return jsonText;
      }
    }
  }

  // Hàm này dùng để parse json response từ Gemini
  private parseEvaluationResponse(text: string): GeminiResReviewPR {
    try {
      logger.info('Raw Gemini response:', text);

      // Cải thiện regex để loại bỏ markdown code blocks
      let cleanText = text.trim();

      // Loại bỏ các markdown code blocks với nhiều pattern khác nhau
      cleanText = cleanText.replace(/^```(?:json)?\s*\n?/gm, ''); // Loại bỏ opening ```json hoặc ```
      cleanText = cleanText.replace(/\n?```\s*$/gm, ''); // Loại bỏ closing ```
      cleanText = cleanText.trim();

      // Fix JSON escape issues
      cleanText = this.fixJsonEscapeIssues(cleanText);

      logger.info('Cleaned text for parsing:', cleanText);

      const parsed = JSON.parse(cleanText);

      // Validation
      if (!parsed.summary || typeof parsed.summary !== 'string') {
        throw new Error('Invalid summary field');
      }

      if (parsed.summary.length > 255) {
        throw new HttpException(400, 'Summary is too long');
      }

      if (!Array.isArray(parsed.comments)) {
        throw new Error('Comments must be an array');
      }

      parsed.comments.forEach((comment: any, index: number) => {
        if (!comment.comment || typeof comment.comment !== 'string') {
          throw new Error(`Invalid comment at index ${index}`);
        }
        if (comment.comment.length > 1000) {
          throw new HttpException(400, `Comment at index ${index} is too long`);
        }
      });

      if (typeof parsed.score !== 'number' || parsed.score < 0 || parsed.score > 10) {
        throw new Error('Score must be a number between 0 and 10');
      }

      return parsed as GeminiResReviewPR;
    } catch (error) {
      logger.error('Error parsing Gemini response:', error);
      logger.error('Original text:', text);

      // Fallback response
      return {
        summary: 'Không thể phân tích phản hồi từ AI',
        score: 0,
        comments: [],
      };
    }
  }
}
