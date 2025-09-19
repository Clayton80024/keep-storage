import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      <SignIn
        fallbackRedirectUrl="/files"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-sm normal-case",
          },
        }}
      />
    </div>
  );
}