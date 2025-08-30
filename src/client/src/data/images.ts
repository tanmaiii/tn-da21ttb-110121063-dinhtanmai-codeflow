import logoLight from "@/assets/images/logo_light.png";
import logo from "@/assets/images/codeflow.png";
// SVG files from public directory
const EnSVG = "/svgs/en.svg";
const ViSVG = "/svgs/vi.svg";
const JaSVG = "/svgs/ja.svg";
const CpSVG = "/svgs/cp.svg";
const FolderSVG = "/svgs/folder.svg";
const NoDataSVG = "/svgs/no-data.svg";

// Image imports
import dfCourses from "@/assets/images/default-course.png";
import authbg from "@/assets/images/auth-v1-mask-light.png";
import err404 from "@/assets/images/5.png";
import github from "@/assets/images/github.png";
import avatar from "@/assets/images/github.png";
import gg from "@/assets/images/google.png";
import bgLogin from "@/assets/images/bg-login.jpg";
import bgLogin2 from "@/assets/images/bg-login-2.png";
export const IMAGES = {
  LOGO: logo,
  LOGO_LIGHT: logoLight,
  DEFAULT_COURSE: dfCourses,
  DEFAULT_PROJECT: dfCourses,
  DEFAULT_POST: dfCourses,
  DEFAULT_AVATAR: dfCourses,
  BG_AUTH: authbg,
  ERR_404: err404,
  GITHUB: github,
  GOOGLE: gg,
  BG_LOGIN: bgLogin,
  BG_LOGIN_LIGHT: bgLogin2,
  AVATAR: avatar
};

export const SVGS = {
  EN: EnSVG,
  VI: ViSVG,
  JA: JaSVG,
  CP: CpSVG,
  FOLDER: FolderSVG,
  NO_DATA: NoDataSVG
};
