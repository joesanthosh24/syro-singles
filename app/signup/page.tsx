import SignUpForm from "@/components/signupform"

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center mb-10">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <SignUpForm />
         {/* Link to Login Page */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage