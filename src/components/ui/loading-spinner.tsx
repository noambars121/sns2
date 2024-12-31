export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#9FE65C] border-t-transparent" />
    </div>
  );
}
