import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <SignUp redirectUrl="/new-user" afterSignUpUrl="/new-user" />
    </div>
  );
};

export default SignUpPage;
