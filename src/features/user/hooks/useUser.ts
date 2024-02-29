import useAuth from "@/features/auth/hooks/useAuth";

const useUser = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error(
      "useUser has to be used within a protected route. currentUser cannot be undefined",
    );
  }

  return currentUser;
};

export default useUser;
