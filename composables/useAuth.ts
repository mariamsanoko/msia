export function useAuth() {
  const supabase = useSupabaseClient()
  const loading = useState("auth:loading", () => false)
  const errorMessage = useState<string | null>("auth:error", () => null)

  async function signIn(email: string, password: string) {
    loading.value = true
    errorMessage.value = null
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false

    if (error) {
      errorMessage.value = error.message
      return false
    }

    await navigateTo("/admin")
    return true
  }

  async function signUp(email: string, password: string) {
    loading.value = true
    errorMessage.value = null
    const { error } = await supabase.auth.signUp({ email, password })
    loading.value = false

    if (error) {
      errorMessage.value = error.message
      return false
    }

    await navigateTo("/admin")
    return true
  }

  async function signOut() {
    loading.value = true
    await supabase.auth.signOut()
    loading.value = false
    await navigateTo("/")
  }

  return {
    loading,
    errorMessage,
    signIn,
    signUp,
    signOut,
  }
}
