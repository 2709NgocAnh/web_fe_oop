import {
  AndroidOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
export const MENU_REGISTER = [
  {
    id: 1,
    name: "fullName",
    type: "text",
    placeholder: "Username",
    errorMessage: "Tên người dùng phải từ 3-16 ký tự! ",
    label: "Username",
    required: true,
    icon: <UserOutlined />,
  },

  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Phải là một địa chỉ email hợp lệ!",
    label: "Email",
    required: true,
    icon: <MailOutlined />,
  },
  {
    id: 3,
    name: "phoneNumber",
    type: "tel",
    placeholder: "Số điện thoại",
    errorMessage: "Phải là số điện thoại hợp lệ!",
    label: "Số điện thoại",
    required: true,
    icon: <PhoneOutlined />,
  },
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Mật khẩu phải bao gồm ký tự in hoa, in thường, chữ số và ký tự đặc biệt",
    label: "Password",
    required: true,
    icon: <LockOutlined />,
  },
  {
    id: 5,
    name: "address",
    type: "text",
    placeholder: "Địa chỉ",
    errorMessage: "Phải nhập địa chỉ!",
    label: "Địa chỉ",
    required: true,
    icon: <AndroidOutlined />,
  },

  {
    id: 6,
    name: "password_confirm",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Mật khẩu không khớp!",
    label: "Confirm Password",
    required: true,
    icon: <LockOutlined />,
  },
];
