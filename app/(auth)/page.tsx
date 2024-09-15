import Form from "@/components/Form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getSession();
  if (session) {
    return redirect("/chats");
  }
  return <Form type="login" />;
};

export default Login;
