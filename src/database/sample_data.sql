-- =============================================
-- USERS TABLE - Bảng người dùng
-- =============================================
INSERT INTO `users` (`id`, `email`, `username`, `uid`, `name`, `password`, `role`, `status`, `avatar`, `bio`, `reset_token`, `reset_token_expires`, `created_at`, `updated_at`, `deleted_at`) VALUES
('72ec6491-d1c3-4321-9013-f913330cc9c3', 'admin@gmail.com', 'admin', NULL, 'Admin', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'admin', 'active', NULL, 'Admin', NULL, NULL, NOW(), NOW(), NULL),
('teach001-0000-1111-2222-333333333333', 'teacher1@gmail.com', 'teacher1', NULL, 'Nguyễn Văn An', "$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6", 'teacher', 'active', NULL, 'Giảng viên CNTT', NULL, NULL, NOW(), NOW(), NULL),
('teach002-0000-1111-2222-333333333333', 'teacher2@gmail.com', 'teacher2', NULL, 'Trần Thị Bình', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên AI', NULL, NULL, NOW(), NOW(), NULL),
('teach003-0000-1111-2222-333333333333', 'teacher3@gmail.com', 'teacher3', NULL, 'Lê Văn Cường', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên ML', NULL, NULL, NOW(), NOW(), NULL),
('teach004-0000-1111-2222-333333333333', 'teacher4@gmail.com', 'teacher4', NULL, 'Phạm Thị Dung', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Khoa học DL', NULL, NULL, NOW(), NOW(), NULL),
('teach005-0000-1111-2222-333333333333', 'teacher5@gmail.com', 'teacher5', NULL, 'Hoàng Văn Đạt', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Cloud', NULL, NULL, NOW(), NOW(), NULL),
('teach006-0000-1111-2222-333333333333', 'teacher6@gmail.com', 'teacher6', NULL, 'Đỗ Thị Nhàn', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên IoT', NULL, NULL, NOW(), NOW(), NULL),
('teach007-0000-1111-2222-333333333333', 'teacher7@gmail.com', 'teacher7', NULL, 'Vũ Văn Giang', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Blockchain', NULL, NULL, NOW(), NOW(), NULL),
('teach008-0000-1111-2222-333333333333', 'teacher8@gmail.com', 'teacher8', NULL, 'Ngô Thị Hà', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Bảo mật', NULL, NULL, NOW(), NOW(), NULL),
('teach009-0000-1111-2222-333333333333', 'teacher9@gmail.com', 'teacher9', NULL, 'Phan Văn Trung', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Robotics', NULL, NULL, NOW(), NOW(), NULL),
('teach010-0000-1111-2222-333333333333', 'teacher10@gmail.com', 'teacher10', NULL, 'Đinh Thị Hồng', '$2b$10$tarFajaVlL76QEU6zHaxruOCJvWTNYVqK.oMzRgXJnZYfK9u1Q2T6', 'teacher', 'active', NULL, 'Giảng viên Data Mining', NULL, NULL, NOW(), NOW(), NULL);

-- =============================================
-- TAGS TABLE - Bảng thẻ tag
-- =============================================
INSERT INTO `tags` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
('tag-js01-0000-1111-222222222222', 'JavaScript', 'Ngôn ngữ lập trình JavaScript và các framework liên quan', NOW(), NOW()),
('tag-reac-0000-1111-222222222222', 'React', 'Thư viện React.js cho phát triển giao diện người dùng', NOW(), NOW()),
('tag-node-0000-1111-222222222222', 'Node.js', 'Môi trường runtime JavaScript cho backend', NOW(), NOW()),
('tag-db01-0000-1111-222222222222', 'Database', 'Cơ sở dữ liệu và các công nghệ liên quan', NOW(), NOW()),
('tag-ml01-0000-1111-222222222222', 'Machine Learning', 'Học máy và trí tuệ nhân tạo', NOW(), NOW()),
('tag-web1-0000-1111-222222222222', 'Web Development', 'Phát triển ứng dụng web full-stack', NOW(), NOW()),
('tag-pyth-0000-1111-222222222222', 'Python', 'Ngôn ngữ lập trình Python và các thư viện phổ biến', NOW(), NOW()),
('tag-java-0000-1111-222222222222', 'Java', 'Ngôn ngữ lập trình Java cho ứng dụng doanh nghiệp và Android', NOW(), NOW()),
('tag-cshp-0000-1111-222222222222', 'C#', 'Ngôn ngữ C# và .NET Framework cho phát triển ứng dụng', NOW(), NOW()),
('tag-php1-0000-1111-222222222222', 'PHP', 'Ngôn ngữ lập trình PHP cho phát triển website và backend', NOW(), NOW()),
('tag-devp-0000-1111-222222222222', 'DevOps', 'Tích hợp CI/CD, quản lý hạ tầng và tự động hóa triển khai', NOW(), NOW()),
('tag-dock-0000-1111-222222222222', 'Docker', 'Nền tảng container hóa ứng dụng và quản lý môi trường', NOW(), NOW()),
('tag-kube-0000-1111-222222222222', 'Kubernetes', 'Hệ thống điều phối container, triển khai và quản lý dịch vụ', NOW(), NOW()),
('tag-figm-0000-1111-222222222222', 'Figma', 'Công cụ thiết kế UI/UX phổ biến cho phát triển sản phẩm', NOW(), NOW()),
('tag-api1-0000-1111-222222222222', 'REST API', 'Thiết kế và xây dựng API cho ứng dụng web và mobile', NOW(), NOW()),
('tag-git1-0000-1111-222222222222', 'Git & GitHub', 'Quản lý mã nguồn và cộng tác phát triển phần mềm', NOW(), NOW());

-- =============================================
-- COURSES TABLE - Bảng khóa học
-- =============================================
INSERT INTO `courses` (`id`, `title`, `description`, `thumbnail`, `start_date`, `end_date`, `reg_start_date`, `reg_end_date`, `topic_deadline`, `status`, `max_group_members`, `password`, `author_id`, `type`, `created_at`, `updated_at`, `deleted_at`) VALUES
-- Tất cả khóa học diễn ra trong tháng 9/2025, deadline topic đầu tháng 10/2025
('course01-0000-1111-2222-333333333333', 'Lập trình Web Full-stack với React & Node.js', 'Khóa học toàn diện về phát triển ứng dụng web từ frontend đến backend sử dụng React.js và Node.js', NULL, '2025-09-01', '2025-09-30', '2025-08-15', '2025-08-30', '2025-10-05', 1, 4, NULL, 'teach001-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course02-0000-1111-2222-333333333333', 'Xây dựng API RESTful và Microservices', 'Học cách thiết kế và phát triển API RESTful, kiến trúc microservices và tích hợp các dịch vụ', NULL, '2025-09-01', '2025-09-30', '2025-08-15', '2025-08-30', '2025-10-05', 1, 3, NULL, 'teach001-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course03-0000-1111-2222-333333333333', 'Trí tuệ nhân tạo cơ bản với Python', 'Khóa học nhập môn về AI, machine learning và deep learning sử dụng Python và các thư viện phổ biến', NULL, '2025-09-02', '2025-09-30', '2025-08-16', '2025-08-31', '2025-10-06', 1, 3, NULL, 'teach002-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course04-0000-1111-2222-333333333333', 'Xử lý ngôn ngữ tự nhiên (NLP)', 'Nghiên cứu và ứng dụng các kỹ thuật NLP trong việc xử lý và phân tích văn bản', NULL, '2025-09-02', '2025-09-30', '2025-08-16', '2025-08-31', '2025-10-06', 1, 2, NULL, 'teach002-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course05-0000-1111-2222-333333333333', 'Machine Learning thực hành', 'Áp dụng các thuật toán machine learning vào các bài toán thực tế với dataset lớn', NULL, '2025-09-03', '2025-09-30', '2025-08-17', '2025-09-01', '2025-10-07', 1, 4, NULL, 'teach003-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course06-0000-1111-2222-333333333333', 'Deep Learning và Neural Networks', 'Nghiên cứu sâu về mạng neural, CNN, RNN và các kiến trúc deep learning hiện đại', NULL, '2025-09-03', '2025-09-30', '2025-08-17', '2025-09-01', '2025-10-07', 1, 3, NULL, 'teach003-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course07-0000-1111-2222-333333333333', 'Phân tích dữ liệu với Python và R', 'Sử dụng Python và R để thu thập, xử lý và phân tích dữ liệu lớn từ nhiều nguồn khác nhau', NULL, '2025-09-04', '2025-09-30', '2025-08-18', '2025-09-02', '2025-10-08', 1, 3, NULL, 'teach004-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course08-0000-1111-2222-333333333333', 'Big Data và Data Mining', 'Nghiên cứu các kỹ thuật khai phá dữ liệu và xử lý big data với Hadoop, Spark', NULL, '2025-09-04', '2025-09-30', '2025-08-18', '2025-09-02', '2025-10-08', 1, 2, NULL, 'teach004-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course09-0000-1111-2222-333333333333', 'Cloud Computing với AWS', 'Triển khai và quản lý ứng dụng trên Amazon Web Services, học các dịch vụ cloud cơ bản', NULL, '2025-09-05', '2025-09-30', '2025-08-19', '2025-09-03', '2025-10-09', 1, 4, NULL, 'teach005-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course10-0000-1111-2222-333333333333', 'DevOps và CI/CD Pipeline', 'Tự động hóa quy trình phát triển phần mềm với Docker, Kubernetes và các công cụ DevOps', NULL, '2025-09-05', '2025-09-30', '2025-08-19', '2025-09-03', '2025-10-09', 1, 3, NULL, 'teach005-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course11-0000-1111-2222-333333333333', 'Internet of Things (IoT) cơ bản', 'Xây dựng hệ thống IoT với Arduino, Raspberry Pi và các cảm biến thông minh', NULL, '2025-09-08', '2025-09-30', '2025-08-22', '2025-09-06', '2025-10-12', 1, 3, NULL, 'teach006-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course12-0000-1111-2222-333333333333', 'Smart Home và Industrial IoT', 'Nghiên cứu ứng dụng IoT trong nhà thông minh và công nghiệp 4.0', NULL, '2025-09-08', '2025-09-30', '2025-08-22', '2025-09-06', '2025-10-12', 1, 2, NULL, 'teach006-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course13-0000-1111-2222-333333333333', 'Blockchain và Cryptocurrency', 'Hiểu về công nghệ blockchain, smart contracts và phát triển ứng dụng DeFi', NULL, '2025-09-10', '2025-09-30', '2025-08-24', '2025-09-08', '2025-10-14', 1, 3, NULL, 'teach007-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course14-0000-1111-2222-333333333333', 'Web3 và Decentralized Applications', 'Nghiên cứu và phát triển ứng dụng phi tập trung (DApps) trên nền tảng Ethereum', NULL, '2025-09-10', '2025-09-30', '2025-08-24', '2025-09-08', '2025-10-14', 1, 2, NULL, 'teach007-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course15-0000-1111-2222-333333333333', 'An ninh mạng và Ethical Hacking', 'Học các kỹ thuật bảo mật, kiểm tra thâm nhập và phòng chống tấn công mạng', NULL, '2025-09-12', '2025-09-30', '2025-08-26', '2025-09-10', '2025-10-16', 1, 3, NULL, 'teach008-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course16-0000-1111-2222-333333333333', 'Cryptography và Digital Forensics', 'Nghiên cứu mã hóa, chữ ký số và điều tra tội phạm mạng', NULL, '2025-09-12', '2025-09-30', '2025-08-26', '2025-09-10', '2025-10-16', 1, 2, NULL, 'teach008-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course17-0000-1111-2222-333333333333', 'Robotics và Automation', 'Thiết kế và lập trình robot tự động, học các thuật toán điều khiển và AI robotics', NULL, '2025-09-15', '2025-09-30', '2025-08-29', '2025-09-13', '2025-10-19', 1, 3, NULL, 'teach009-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course18-0000-1111-2222-333333333333', 'Computer Vision cho Robotics', 'Nghiên cứu thị giác máy tính và ứng dụng trong robot thông minh', NULL, '2025-09-15', '2025-09-30', '2025-08-29', '2025-09-13', '2025-10-19', 1, 2, NULL, 'teach009-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL),
('course19-0000-1111-2222-333333333333', 'Data Mining và Business Intelligence', 'Khai phá dữ liệu để hỗ trợ ra quyết định kinh doanh, xây dựng dashboard và báo cáo', NULL, '2025-09-18', '2025-09-30', '2025-09-01', '2025-09-16', '2025-10-22', 1, 4, NULL, 'teach010-0000-1111-2222-333333333333', 'major', NOW(), NOW(), NULL),
('course20-0000-1111-2222-333333333333', 'Predictive Analytics và Forecasting', 'Nghiên cứu các mô hình dự đoán và phân tích xu hướng từ dữ liệu lịch sử', NULL, '2025-09-18', '2025-09-30', '2025-09-01', '2025-09-16', '2025-10-22', 1, 3, NULL, 'teach010-0000-1111-2222-333333333333', 'foundation', NOW(), NOW(), NULL);

-- =============================================
-- COURSE_TAGS TABLE - Bảng liên kết khóa học và tag
-- =============================================
INSERT INTO `course_tags` (`id`, `course_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(UUID(), 'course01-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course01-0000-1111-2222-333333333333', 'tag-reac-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course01-0000-1111-2222-333333333333', 'tag-node-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course01-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course02-0000-1111-2222-333333333333', 'tag-api1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course02-0000-1111-2222-333333333333', 'tag-node-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course02-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course03-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course03-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course04-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course04-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course05-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course05-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course06-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course06-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course07-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course07-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course08-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course08-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course09-0000-1111-2222-333333333333', 'tag-devp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course09-0000-1111-2222-333333333333', 'tag-dock-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course10-0000-1111-2222-333333333333', 'tag-devp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course10-0000-1111-2222-333333333333', 'tag-dock-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course10-0000-1111-2222-333333333333', 'tag-kube-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course10-0000-1111-2222-333333333333', 'tag-git1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course11-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course11-0000-1111-2222-333333333333', 'tag-cshp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course12-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course12-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course13-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course13-0000-1111-2222-333333333333', 'tag-node-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course14-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course14-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course15-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course15-0000-1111-2222-333333333333', 'tag-devp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course16-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course16-0000-1111-2222-333333333333', 'tag-cshp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course17-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course17-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course17-0000-1111-2222-333333333333', 'tag-cshp-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course18-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course18-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course19-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course19-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course20-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course20-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'course20-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW());


-- =============================================
-- POSTS TABLE
-- =============================================
INSERT INTO `posts` (`id`, `title`, `content`, `status`, `author_id`, `thumbnail`, `created_at`, `updated_at`, `deleted_at`)
VALUES
('post001-0000-1111-2222-333333333333', 'Chào mừng đến với nền tảng CodeFlow', 'CodeFlow là nền tảng học tập trực tuyến hiện đại, được thiết kế để hỗ trợ sinh viên và giảng viên trong quá trình giảng dạy và học tập. Với giao diện thân thiện và các tính năng tiên tiến, CodeFlow mang đến trải nghiệm học tập tuyệt vời.<br><br><strong>Các tính năng nổi bật:</strong><br>- Quản lý khóa học trực tuyến<br>- Hệ thống phân tích code tự động<br>- Theo dõi tiến độ học tập<br>- Tương tác giữa giảng viên và sinh viên<br>- Báo cáo chi tiết về kết quả học tập<br><br>Hãy khám phá và trải nghiệm những tính năng tuyệt vời mà CodeFlow mang lại!', 1, '72ec6491-d1c3-4321-9013-f913330cc9c3', NULL, NOW(), NOW(), NULL),
('post002-0000-1111-2222-333333333333', 'Hướng dẫn sử dụng hệ thống quản lý khóa học', 'Để tối ưu hóa trải nghiệm sử dụng CodeFlow, chúng tôi xin chia sẻ hướng dẫn chi tiết về cách sử dụng hệ thống quản lý khóa học.<br><br><strong>Đối với Giảng viên:</strong><br>1. Tạo khóa học mới từ dashboard<br>2. Thiết lập thông tin cơ bản: tên khóa học, mô tả, thời gian<br>3. Thêm tags phù hợp để sinh viên dễ tìm kiếm<br>4. Quản lý danh sách sinh viên đăng ký<br>5. Theo dõi tiến độ và kết quả học tập<br><br><strong>Đối với Sinh viên:</strong><br>1. Duyệt danh sách khóa học có sẵn<br>2. Đăng ký khóa học trong thời gian quy định<br>3. Tham gia các hoạt động học tập<br>4. Nộp bài tập và dự án<br>5. Theo dõi điểm số và feedback<br><br>Chúc các bạn có những trải nghiệm tuyệt vời!', 1, '72ec6491-d1c3-4321-9013-f913330cc9c3', NULL, NOW(), NOW(), NULL),
('post003-0000-1111-2222-333333333333', 'Cập nhật tính năng mới: Phân tích code tự động', 'CodeFlow vừa ra mắt tính năng phân tích code tự động - một công cụ mạnh mẽ giúp cải thiện chất lượng code của sinh viên.<br><br><strong>Các chỉ số được phân tích:</strong><br>- <strong>Code Quality</strong>: Đánh giá chất lượng code dựa trên các tiêu chuẩn ngành<br>- <strong>Security</strong>: Phát hiện các lỗ hổng bảo mật tiềm ẩn<br>- <strong>Performance</strong>: Đo lường hiệu suất và tối ưu hóa<br>- <strong>Maintainability</strong>: Đánh giá khả năng bảo trì code<br>- <strong>Documentation</strong>: Kiểm tra tính đầy đủ của tài liệu<br><br><strong>Lợi ích:</strong><br>✅ Phát hiện lỗi sớm trong quá trình phát triển<br>✅ Cải thiện kỹ năng lập trình<br>✅ Học các best practices<br>✅ Tăng hiệu quả làm việc nhóm<br><br>Hãy trải nghiệm tính năng mới này trong các khóa học của bạn!', 1, '72ec6491-d1c3-4321-9013-f913330cc9c3', NULL, NOW(), NOW(), NULL),
('post004-0000-1111-2222-333333333333', 'Xu hướng phát triển Web Full-stack 2025', 'Năm 2025 đánh dấu những bước tiến vượt bậc trong lĩnh vực phát triển web. Là một giảng viên CNTT, tôi muốn chia sẻ những xu hướng quan trọng mà các bạn sinh viên cần nắm bắt.<br><br><strong>Frontend Trends:</strong><br>- <strong>React 19</strong>: Với Server Components và improved hydration<br>- <strong>Next.js 15</strong>: App Router và enhanced performance<br>- <strong>TypeScript</strong>: Ngày càng trở thành standard<br>- <strong>Tailwind CSS</strong>: Utility-first approach<br><br><strong>Backend Trends:</strong><br>- <strong>Node.js</strong>: Vẫn là lựa chọn hàng đầu<br>- <strong>Microservices</strong>: Kiến trúc phổ biến cho ứng dụng lớn<br>- <strong>GraphQL</strong>: API query language hiệu quả<br>- <strong>Serverless</strong>: AWS Lambda, Vercel Functions<br><br>Hãy tham gia khóa học "Lập trình Web Full-stack với React & Node.js" để nắm vững những công nghệ này!', 1, 'teach001-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post005-0000-1111-2222-333333333333', 'Thiết kế API RESTful: Best Practices và Common Mistakes', 'API RESTful là xương sống của hầu hết các ứng dụng web hiện đại. Dựa trên kinh nghiệm giảng dạy, tôi tổng hợp những best practices và lỗi thường gặp.<br><br><strong>REST API Best Practices:</strong><br><br><strong>1. URL Design:</strong><br>✅ GET /api/users<br>✅ GET /api/users/123<br>✅ POST /api/users<br>❌ GET /api/getUsers<br>❌ POST /api/createUser<br><br><strong>2. HTTP Methods:</strong><br>- GET: Lấy dữ liệu<br>- POST: Tạo mới<br>- PUT: Cập nhật toàn bộ<br>- PATCH: Cập nhật một phần<br>- DELETE: Xóa<br><br><strong>3. Status Codes:</strong><br>- 200: OK<br>- 201: Created<br>- 400: Bad Request<br>- 401: Unauthorized<br>- 404: Not Found<br>- 500: Internal Server Error<br><br>Hãy đăng ký khóa "Xây dựng API RESTful và Microservices" để học chi tiết!', 1, 'teach001-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post006-0000-1111-2222-333333333333', 'Docker và Containerization: Tại sao mọi developer cần biết?', 'Container technology đã thay đổi cách chúng ta phát triển, deploy và quản lý ứng dụng. Hôm nay tôi sẽ giải thích tại sao Docker lại quan trọng.<br><br><strong>Vấn đề truyền thống:</strong><br>- "It works on my machine" syndrome<br>- Khó khăn trong việc setup môi trường<br>- Inconsistency giữa development và production<br>- Dependency conflicts<br><br><strong>Docker giải quyết như thế nào:</strong><br><br><strong>1. Consistency:</strong> Đảm bảo môi trường giống nhau ở mọi nơi<br><strong>2. Isolation:</strong> Mỗi container có môi trường riêng<br><strong>3. Portability:</strong> Chạy anywhere Docker có thể chạy<br><strong>4. Scalability:</strong> Dễ dàng scale up/down<br><br><strong>Lợi ích cho developers:</strong><br>✅ Setup môi trường nhanh chóng<br>✅ Consistent development environment<br>✅ Easy deployment<br>✅ Better resource utilization<br>✅ Microservices architecture support<br><br>Docker không chỉ là trend mà đã trở thành necessity trong modern software development!', 1, 'teach001-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post007-0000-1111-2222-333333333333', 'Trí tuệ nhân tạo trong giáo dục: Cơ hội và thách thức', 'AI đang revolutionize nhiều ngành nghề, và giáo dục không phải ngoại lệ. Với vai trò giảng viên AI, tôi muốn chia sẻ góc nhìn về việc ứng dụng AI trong giáo dục.<br><br><strong>Cơ hội từ AI:</strong><br><br><strong>1. Personalized Learning:</strong><br>- Adaptive learning systems<br>- Customized learning paths<br>- Real-time difficulty adjustment<br>- Individual progress tracking<br><br><strong>2. Automated Assessment:</strong><br>- Auto-grading systems<br>- Plagiarism detection<br>- Code review automation<br>- Instant feedback<br><br><strong>3. Intelligent Tutoring:</strong><br>- 24/7 virtual assistants<br>- Natural language Q&A<br>- Concept explanation<br>- Problem-solving guidance<br><br><strong>Thách thức cần giải quyết:</strong><br><br><strong>1. Technical Challenges:</strong><br>- Data quality và privacy<br>- Algorithm bias<br>- Model interpretability<br>- Integration complexity<br><br>AI là công cụ mạnh mẽ nhưng cần được sử dụng một cách thông minh và có trách nhiệm trong giáo dục.', 1, 'teach002-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post008-0000-1111-2222-333333333333', 'Machine Learning cho người mới bắt đầu: Roadmap học tập', 'Nhiều bạn sinh viên hỏi tôi nên bắt đầu học Machine Learning như thế nào. Đây là roadmap chi tiết dựa trên kinh nghiệm giảng dạy của tôi.<br><br><strong>Phase 1: Foundation (2-3 tháng)</strong><br><br><strong>Mathematics:</strong><br>- Linear Algebra: Vectors, matrices, eigenvalues<br>- Statistics: Probability, distributions, hypothesis testing<br>- Calculus: Derivatives, gradients, optimization<br><br><strong>Programming:</strong><br>- Python basics<br>- NumPy, Pandas<br>- Matplotlib, Seaborn<br><br><strong>Phase 2: Core ML (3-4 tháng)</strong><br><br><strong>Supervised Learning:</strong><br>- Linear/Logistic Regression<br>- Decision Trees<br>- Random Forest<br>- SVM<br>- Neural Networks<br><br><strong>Unsupervised Learning:</strong><br>- K-Means Clustering<br>- Hierarchical Clustering<br>- PCA<br>- Association Rules<br><br><strong>Phase 3: Advanced Topics (4-6 tháng)</strong><br><br><strong>Deep Learning:</strong><br>- Neural Networks architecture<br>- CNN for Computer Vision<br>- RNN/LSTM for sequences<br>- Transfer Learning<br><br>Hãy tham gia khóa học của tôi để có hướng dẫn chi tiết hơn!', 1, 'teach002-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post009-0000-1111-2222-333333333333', 'Natural Language Processing: Từ lý thuyết đến thực hành', 'NLP là một trong những lĩnh vực thú vị nhất của AI. Hôm nay tôi sẽ chia sẻ journey từ basic đến advanced trong NLP.<br><br><strong>NLP Pipeline cơ bản:</strong><br><br><strong>1. Text Preprocessing:</strong><br>- Tokenization<br>- Remove stopwords<br>- Stemming/Lemmatization<br>- Normalization<br><br><strong>2. Feature Extraction:</strong><br>- Bag of Words (BoW)<br>- TF-IDF<br>- Word Embeddings (Word2Vec, GloVe)<br>- BERT embeddings<br><br><strong>3. Model Building:</strong><br>- Traditional: Naive Bayes, SVM<br>- Deep Learning: RNN, LSTM, Transformer<br><br><strong>Ứng dụng thực tế:</strong><br><br><strong>Sentiment Analysis:</strong><br>- Social media monitoring<br>- Product review analysis<br>- Customer feedback processing<br><br><strong>Text Classification:</strong><br>- Spam detection<br>- News categorization<br>- Document classification<br><br><strong>Information Extraction:</strong><br>- Named Entity Recognition (NER)<br>- Relation extraction<br>- Knowledge graph construction<br><br>NLP đang phát triển rất nhanh với các breakthrough như GPT, BERT. Đây là thời điểm tuyệt vời để bắt đầu!', 1, 'teach002-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL),
('post010-0000-1111-2222-333333333333', 'Deep Learning vs Traditional Machine Learning: Khi nào dùng gì?', 'Một câu hỏi tôi thường nhận được: "Khi nào nên dùng Deep Learning và khi nào nên dùng Traditional ML?" Hôm nay tôi sẽ giải đáp chi tiết.<br><br><strong>Traditional Machine Learning:</strong><br><br><strong>Ưu điểm:</strong><br>✅ Faster training time<br>✅ Less data required<br>✅ More interpretable<br>✅ Lower computational cost<br>✅ Easier to debug<br><br><strong>Nhược điểm:</strong><br>❌ Manual feature engineering<br>❌ Limited complexity handling<br>❌ Performance plateau<br><br><strong>Khi nào sử dụng:</strong><br>- Small to medium datasets (<100K samples)<br>- Tabular data<br>- Need interpretability<br>- Limited computational resources<br>- Simple patterns<br><br><strong>Deep Learning:</strong><br><br><strong>Ưu điểm:</strong><br>✅ Automatic feature extraction<br>✅ Handle complex patterns<br>✅ State-of-the-art performance<br>✅ End-to-end learning<br><br><strong>Nhược điểm:</strong><br>❌ Requires large datasets<br>❌ Computationally expensive<br>❌ Black box (less interpretable)<br>❌ Hyperparameter sensitive<br><br><strong>Decision Framework:</strong><br><br>1. <strong>Data size?</strong> Small → Traditional ML<br>2. <strong>Data type?</strong> Tabular → Traditional ML, Images/Text → DL<br>3. <strong>Interpretability needed?</strong> Yes → Traditional ML<br>4. <strong>Performance critical?</strong> Yes + Large data → Deep Learning<br><br>Không có silver bullet. Lựa chọn phụ thuộc vào context cụ thể của problem bạn đang giải quyết!', 1, 'teach002-0000-1111-2222-333333333333', NULL, NOW(), NOW(), NULL);

-- =============================================
-- POST TAGS TABLE
-- =============================================
INSERT INTO `post_tags` (`id`, `post_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(UUID(), 'post001-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post001-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post002-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post002-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post004-0000-1111-2222-333333333333', 'tag-reac-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post004-0000-1111-2222-333333333333', 'tag-js01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post004-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post005-0000-1111-2222-333333333333', 'tag-web1-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post005-0000-1111-2222-333333333333', 'tag-figm-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post006-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post008-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post008-0000-1111-2222-333333333333', 'tag-db01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post009-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post010-0000-1111-2222-333333333333', 'tag-ml01-0000-1111-222222222222', NOW(), NOW()),
(UUID(), 'post010-0000-1111-2222-333333333333', 'tag-pyth-0000-1111-222222222222', NOW(), NOW());


-- =============================================
-- TOPIC
-- ==============================================
INSERT INTO `topics` (`id`, `title`, `description`, `course_id`, `author_id`, `is_custom`, `status`, `group_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
-- Course 01: Lập trình Web Full-stack với React & Node.js
('topic01-0000-1111-2222-333333333333', 'Web bán đồng hồ', 'Xây dựng website thương mại điện tử bán đồng hồ với React frontend và Node.js backend', 'course01-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic02-0000-1111-2222-333333333333', 'Ứng dụng quản lý thư viện', 'Phát triển hệ thống quản lý thư viện trực tuyến với tính năng mượn/trả sách', 'course01-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic03-0000-1111-2222-333333333333', 'Platform học trực tuyến', 'Tạo nền tảng học tập trực tuyến với video streaming và quiz tương tác', 'course01-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 02: Xây dựng API RESTful và Microservices
('topic04-0000-1111-2222-333333333333', 'API Gateway cho hệ thống Banking', 'Thiết kế API Gateway quản lý các microservices trong hệ thống ngân hàng', 'course02-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic05-0000-1111-2222-333333333333', 'RESTful API cho ứng dụng Food Delivery', 'Xây dựng API backend cho ứng dụng giao đồ ăn với payment integration', 'course02-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic06-0000-1111-2222-333333333333', 'Microservices cho E-commerce', 'Phát triển kiến trúc microservices cho hệ thống thương mại điện tử lớn', 'course02-0000-1111-2222-333333333333', 'teach001-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 03: Trí tuệ nhân tạo cơ bản với Python
('topic07-0000-1111-2222-333333333333', 'Chatbot thông minh với NLP', 'Xây dựng chatbot customer service sử dụng Natural Language Processing', 'course03-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic08-0000-1111-2222-333333333333', 'Hệ thống gợi ý sản phẩm', 'Phát triển recommendation system cho website bán hàng sử dụng ML', 'course03-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic09-0000-1111-2222-333333333333', 'Phân tích sentiment mạng xã hội', 'Ứng dụng AI để phân tích cảm xúc từ dữ liệu social media', 'course03-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 04: Xử lý ngôn ngữ tự nhiên (NLP)
('topic10-0000-1111-2222-333333333333', 'Hệ thống dịch thuật tự động', 'Xây dựng ứng dụng dịch thuật đa ngôn ngữ sử dụng Transformer', 'course04-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic11-0000-1111-2222-333333333333', 'Phân loại văn bản tin tức', 'Tạo model phân loại tin tức theo chủ đề sử dụng BERT', 'course04-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic12-0000-1111-2222-333333333333', 'Trích xuất thông tin từ CV', 'Phát triển hệ thống NER để trích xuất thông tin từ resume/CV', 'course04-0000-1111-2222-333333333333', 'teach002-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 05: Machine Learning thực hành
('topic13-0000-1111-2222-333333333333', 'Dự đoán giá bất động sản', 'Xây dựng model regression dự đoán giá nhà đất dựa trên các yếu tố', 'course05-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic14-0000-1111-2222-333333333333', 'Phát hiện gian lận thẻ tín dụng', 'Ứng dụng ML để detect fraud trong giao dịch thẻ tín dụng', 'course05-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic15-0000-1111-2222-333333333333', 'Phân tích churn khách hàng', 'Dự đoán khách hàng có khả năng rời bỏ dịch vụ sử dụng classification', 'course05-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 06: Deep Learning và Neural Networks
('topic16-0000-1111-2222-333333333333', 'Nhận diện khuôn mặt với CNN', 'Xây dựng hệ thống face recognition sử dụng Convolutional Neural Network', 'course06-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic17-0000-1111-2222-333333333333', 'Sinh văn bản với LSTM', 'Tạo model sinh văn bản tự động sử dụng Recurrent Neural Network', 'course06-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic18-0000-1111-2222-333333333333', 'Phân loại hình ảnh y tế', 'Ứng dụng deep learning trong chẩn đoán bệnh từ hình ảnh X-ray', 'course06-0000-1111-2222-333333333333', 'teach003-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 07: Phân tích dữ liệu với Python và R
('topic19-0000-1111-2222-333333333333', 'Dashboard báo cáo doanh thu', 'Tạo interactive dashboard phân tích doanh thu bán hàng với Plotly', 'course07-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic20-0000-1111-2222-333333333333', 'Phân tích hành vi khách hàng', 'Nghiên cứu customer behavior từ dữ liệu web analytics', 'course07-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic21-0000-1111-2222-333333333333', 'Dự báo xu hướng thị trường', 'Ứng dụng time series analysis để dự đoán trends thị trường chứng khoán', 'course07-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 08: Big Data và Data Mining
('topic22-0000-1111-2222-333333333333', 'Phân tích dữ liệu lớn với Spark', 'Xử lý và phân tích big data từ social media sử dụng Apache Spark', 'course08-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic23-0000-1111-2222-333333333333', 'Data Mining cho Retail', 'Khai phá dữ liệu bán lẻ để tìm market basket patterns', 'course08-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic24-0000-1111-2222-333333333333', 'Streaming Analytics với Kafka', 'Xây dựng real-time analytics pipeline sử dụng Apache Kafka', 'course08-0000-1111-2222-333333333333', 'teach004-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 09: Cloud Computing với AWS
('topic25-0000-1111-2222-333333333333', 'Triển khai web app lên AWS', 'Deploy scalable web application sử dụng EC2, RDS và CloudFront', 'course09-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic26-0000-1111-2222-333333333333', 'Serverless API với Lambda', 'Xây dựng REST API serverless sử dụng AWS Lambda và API Gateway', 'course09-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic27-0000-1111-2222-333333333333', 'Data Lake trên AWS', 'Thiết kế và triển khai data lake architecture với S3 và Glue', 'course09-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 10: DevOps và CI/CD Pipeline
('topic28-0000-1111-2222-333333333333', 'CI/CD Pipeline với Jenkins', 'Xây dựng automated deployment pipeline cho ứng dụng web', 'course10-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic29-0000-1111-2222-333333333333', 'Containerization với Docker', 'Dockerize ứng dụng microservices và orchestration với Kubernetes', 'course10-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic30-0000-1111-2222-333333333333', 'Infrastructure as Code', 'Quản lý hạ tầng AWS sử dụng Terraform và CloudFormation', 'course10-0000-1111-2222-333333333333', 'teach005-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 11: Internet of Things (IoT) cơ bản
('topic31-0000-1111-2222-333333333333', 'Smart Home System', 'Xây dựng hệ thống nhà thông minh với Arduino và cảm biến', 'course11-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic32-0000-1111-2222-333333333333', 'Hệ thống giám sát môi trường', 'Phát triển IoT solution monitoring chất lượng không khí', 'course11-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic33-0000-1111-2222-333333333333', 'IoT Agriculture Monitoring', 'Ứng dụng IoT trong nông nghiệp thông minh với Raspberry Pi', 'course11-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 12: Smart Home và Industrial IoT
('topic34-0000-1111-2222-333333333333', 'Industrial 4.0 Monitoring', 'Hệ thống giám sát máy móc công nghiệp sử dụng IoT sensors', 'course12-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic35-0000-1111-2222-333333333333', 'Smart Factory Dashboard', 'Tạo real-time dashboard cho smart factory với MQTT', 'course12-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic36-0000-1111-2222-333333333333', 'Predictive Maintenance IoT', 'Ứng dụng ML trong bảo trì dự đoán thiết bị công nghiệp', 'course12-0000-1111-2222-333333333333', 'teach006-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 13: Blockchain và Cryptocurrency
('topic37-0000-1111-2222-333333333333', 'DeFi Lending Platform', 'Xây dựng nền tảng cho vay phi tập trung trên Ethereum', 'course13-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic38-0000-1111-2222-333333333333', 'NFT Marketplace', 'Phát triển marketplace giao dịch NFT với smart contracts', 'course13-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic39-0000-1111-2222-333333333333', 'Supply Chain Blockchain', 'Ứng dụng blockchain trong quản lý chuỗi cung ứng', 'course13-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 14: Web3 và Decentralized Applications
('topic40-0000-1111-2222-333333333333', 'Decentralized Social Network', 'Xây dựng mạng xã hội phi tập trung trên blockchain', 'course14-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic41-0000-1111-2222-333333333333', 'Web3 Gaming Platform', 'Phát triển game blockchain với play-to-earn mechanics', 'course14-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic42-0000-1111-2222-333333333333', 'DAO Governance System', 'Tạo hệ thống quản trị phi tập trung (DAO) với voting mechanism', 'course14-0000-1111-2222-333333333333', 'teach007-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 15: An ninh mạng và Ethical Hacking
('topic43-0000-1111-2222-333333333333', 'Penetration Testing Tool', 'Phát triển công cụ kiểm tra thâm nhập tự động', 'course15-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic44-0000-1111-2222-333333333333', 'Network Security Monitor', 'Xây dựng hệ thống giám sát bảo mật mạng real-time', 'course15-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic45-0000-1111-2222-333333333333', 'Vulnerability Scanner', 'Tạo tool scan lỗ hổng bảo mật cho web applications', 'course15-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 16: Cryptography và Digital Forensics
('topic46-0000-1111-2222-333333333333', 'Encrypted Messaging App', 'Phát triển ứng dụng nhắn tin mã hóa end-to-end', 'course16-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic47-0000-1111-2222-333333333333', 'Digital Forensics Toolkit', 'Xây dựng bộ công cụ điều tra tội phạm mạng', 'course16-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic48-0000-1111-2222-333333333333', 'Blockchain Forensics', 'Phân tích và truy vết giao dịch cryptocurrency', 'course16-0000-1111-2222-333333333333', 'teach008-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 17: Robotics và Automation
('topic49-0000-1111-2222-333333333333', 'Autonomous Delivery Robot', 'Thiết kế robot giao hàng tự động với navigation system', 'course17-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic50-0000-1111-2222-333333333333', 'Robotic Arm Controller', 'Phát triển hệ thống điều khiển cánh tay robot công nghiệp', 'course17-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic51-0000-1111-2222-333333333333', 'Swarm Robotics System', 'Xây dựng hệ thống robot đàn với collective intelligence', 'course17-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 18: Computer Vision cho Robotics
('topic52-0000-1111-2222-333333333333', 'Object Detection Robot', 'Robot nhận diện và phân loại đối tượng sử dụng computer vision', 'course18-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic53-0000-1111-2222-333333333333', 'Visual SLAM System', 'Phát triển hệ thống định vị và mapping cho robot di động', 'course18-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic54-0000-1111-2222-333333333333', 'Gesture Recognition Robot', 'Robot tương tác con người thông qua nhận diện cử chỉ', 'course18-0000-1111-2222-333333333333', 'teach009-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 19: Data Mining và Business Intelligence
('topic55-0000-1111-2222-333333333333', 'Customer Analytics Platform', 'Xây dựng nền tảng phân tích khách hàng cho doanh nghiệp', 'course19-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic56-0000-1111-2222-333333333333', 'Sales Forecasting System', 'Hệ thống dự báo doanh số bán hàng sử dụng data mining', 'course19-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic57-0000-1111-2222-333333333333', 'Business Intelligence Dashboard', 'Tạo executive dashboard cho báo cáo kinh doanh tổng hợp', 'course19-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),

-- Course 20: Predictive Analytics và Forecasting
('topic58-0000-1111-2222-333333333333', 'Stock Price Prediction', 'Dự đoán giá cổ phiếu sử dụng time series và deep learning', 'course20-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic59-0000-1111-2222-333333333333', 'Demand Forecasting System', 'Hệ thống dự báo nhu cầu cho supply chain management', 'course20-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL),
('topic60-0000-1111-2222-333333333333', 'Weather Prediction Model', 'Xây dựng model dự báo thời tiết sử dụng machine learning', 'course20-0000-1111-2222-333333333333', 'teach010-0000-1111-2222-333333333333', 0, 'pending', NULL, NOW(), NOW(), NULL);


-- =============================================
-- comments 
-- ==============================================
INSERT INTO `comments` (`id`, `parent_id`, `author_id`, `post_id`, `course_id`, `content`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(UUID(), NULL, 'teach001-0000-1111-2222-333333333333', NULL, 'course01-0000-1111-2222-333333333333', 'Khóa học này rất phù hợp cho những ai muốn trở thành full-stack developer. Nội dung được thiết kế từ cơ bản đến nâng cao.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach001-0000-1111-2222-333333333333', NULL, 'course02-0000-1111-2222-333333333333', 'API design là kỹ năng rất quan trọng. Khóa học này sẽ giúp các bạn hiểu sâu về RESTful và microservices.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach002-0000-1111-2222-333333333333', NULL, 'course03-0000-1111-2222-333333333333', 'AI là tương lai của công nghệ. Khóa học cung cấp nền tảng vững chắc cho người mới bắt đầu với Python.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach002-0000-1111-2222-333333333333', NULL, 'course04-0000-1111-2222-333333333333', 'NLP đang rất hot hiện nay. Từ chatbot đến dịch thuật, tất cả đều cần kiến thức NLP vững vàng.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach003-0000-1111-2222-333333333333', NULL, 'course05-0000-1111-2222-333333333333', 'Machine Learning thực hành với dataset thực tế sẽ giúp các bạn hiểu rõ hơn về cách áp dụng lý thuyết vào thực tế.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach003-0000-1111-2222-333333333333', NULL, 'course06-0000-1111-2222-333333333333', 'Deep Learning là lĩnh vực phức tạp nhưng rất thú vị. Khóa học sẽ đưa các bạn từ neural network cơ bản đến các kiến trúc hiện đại.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach004-0000-1111-2222-333333333333', NULL, 'course07-0000-1111-2222-333333333333', 'Data analysis là kỹ năng cốt lõi của Data Scientist. Python và R là hai công cụ mạnh mẽ nhất hiện nay.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach004-0000-1111-2222-333333333333', NULL, 'course08-0000-1111-2222-333333333333', 'Big Data đang thay đổi cách chúng ta xử lý thông tin. Hadoop và Spark là những công nghệ không thể thiếu.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach005-0000-1111-2222-333333333333', NULL, 'course09-0000-1111-2222-333333333333', 'AWS là nền tảng cloud hàng đầu thế giới. Khóa học sẽ giúp các bạn master các dịch vụ cơ bản của AWS.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach005-0000-1111-2222-333333333333', NULL, 'course10-0000-1111-2222-333333333333', 'DevOps là xu hướng tất yếu trong phát triển phần mềm hiện đại. CI/CD pipeline sẽ tăng hiệu suất làm việc đáng kể.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach006-0000-1111-2222-333333333333', NULL, 'course11-0000-1111-2222-333333333333', 'IoT đang kết nối mọi thứ xung quanh chúng ta. Từ Arduino đến Raspberry Pi, khóa học sẽ dạy từ cơ bản đến nâng cao.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach006-0000-1111-2222-333333333333', NULL, 'course12-0000-1111-2222-333333333333', 'Smart Home và Industrial IoT là ứng dụng thực tiễn của công nghệ 4.0. Rất thích hợp cho những ai muốn làm việc trong lĩnh vực này.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach007-0000-1111-2222-333333333333', NULL, 'course13-0000-1111-2222-333333333333', 'Blockchain không chỉ là cryptocurrency. Smart contracts và DeFi đang mở ra nhiều cơ hội nghề nghiệp mới.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach007-0000-1111-2222-333333333333', NULL, 'course14-0000-1111-2222-333333333333', 'Web3 là tương lai của internet phi tập trung. DApps sẽ thay đổi cách chúng ta tương tác với ứng dụng web.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach008-0000-1111-2222-333333333333', NULL, 'course15-0000-1111-2222-333333333333', 'Cybersecurity là lĩnh vực rất quan trọng trong thời đại số. Ethical hacking giúp bảo vệ hệ thống khỏi các mối đe dọa.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach008-0000-1111-2222-333333333333', NULL, 'course16-0000-1111-2222-333333333333', 'Cryptography là nền tảng của bảo mật thông tin. Digital forensics giúp điều tra và phát hiện tội phạm mạng.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach009-0000-1111-2222-333333333333', NULL, 'course17-0000-1111-2222-333333333333', 'Robotics kết hợp AI sẽ tạo ra những robot thông minh có khả năng tự động hóa nhiều công việc phức tạp.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach009-0000-1111-2222-333333333333', NULL, 'course18-0000-1111-2222-333333333333', 'Computer Vision cho robot là lĩnh vực rất thú vị. Robot có thể nhìn và hiểu thế giới xung quanh như con người.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach010-0000-1111-2222-333333333333', NULL, 'course19-0000-1111-2222-333333333333', 'Data Mining trong business intelligence giúp doanh nghiệp đưa ra quyết định dựa trên dữ liệu chính xác.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach010-0000-1111-2222-333333333333', NULL, 'course20-0000-1111-2222-333333333333', 'Predictive Analytics là chìa khóa để dự đoán tương lai. Từ dự báo thời tiết đến dự đoán thị trường, tất cả đều cần kỹ năng này.', 1, NOW(), NOW(), NULL),

-- Comments cho các post
(UUID(), NULL, '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post001-0000-1111-2222-333333333333', NULL, 'Cảm ơn admin đã giới thiệu nền tảng CodeFlow! Tôi rất hào hứng được trải nghiệm các tính năng mới này.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach001-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NULL, 'Hướng dẫn rất chi tiết và dễ hiểu. Điều này sẽ giúp các giảng viên mới sử dụng hệ thống một cách hiệu quả.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach002-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NULL, 'Tính năng phân tích code tự động thật tuyệt vời! Điều này sẽ giúp sinh viên cải thiện kỹ năng coding rất nhiều.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach003-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NULL, 'Bài viết rất cập nhật với xu hướng công nghệ 2025. React 19 và Next.js 15 thực sự đang thay đổi cách chúng ta phát triển web.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach004-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NULL, 'Best practices về REST API rất hữu ích! Tôi sẽ áp dụng những nguyên tắc này trong khóa học của mình.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach005-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NULL, 'Docker thực sự đã revolutionize cách chúng ta deploy ứng dụng. Containerization là must-have skill cho mọi developer.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach006-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NULL, 'AI trong giáo dục là chủ đề rất thú vị. Personalized learning sẽ thay đổi hoàn toàn cách chúng ta học và dạy.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach007-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NULL, 'Roadmap ML rất chi tiết và thực tế. Phase-based learning approach sẽ giúp người mới bắt đầu không bị overwhelmed.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach008-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NULL, 'NLP pipeline explanation rất rõ ràng. Từ preprocessing đến model building, tất cả đều được trình bày một cách có hệ thống.', 1, NOW(), NOW(), NULL),
(UUID(), NULL, 'teach009-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NULL, 'So sánh Deep Learning vs Traditional ML rất hữu ích. Decision framework cuối bài sẽ giúp nhiều người chọn đúng approach.', 1, NOW(), NOW(), NULL);


-- =============================================
-- post_likes 
-- ==============================================
INSERT INTO `post_likes` (`id`, `user_id`, `post_id`, `created_at`, `updated_at`) VALUES
-- Admin likes all posts
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), '72ec6491-d1c3-4321-9013-f913330cc9c3', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher001 likes all posts
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach001-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher002 likes all posts
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach002-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher003 likes all posts
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach003-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher004 likes all posts
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach004-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher005 likes all posts
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach005-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher006 likes all posts
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach006-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher007 likes all posts
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach007-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher008 likes all posts
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach008-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher009 likes all posts
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach009-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW()),

-- Teacher010 likes all posts
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post001-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post002-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post003-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post004-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post005-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post006-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post007-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post008-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post009-0000-1111-2222-333333333333', NOW(), NOW()),
(UUID(), 'teach010-0000-1111-2222-333333333333', 'post010-0000-1111-2222-333333333333', NOW(), NOW());
