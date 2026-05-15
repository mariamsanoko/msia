export type Formation = {
  id: string | number
  title: string
  description: string | null
  level: string | null
  duration: string | null
  is_published: boolean
  created_at?: string
  updated_at?: string
}

export type FormationInput = Omit<Formation, "id" | "created_at" | "updated_at">

const TABLE_NAME = "formations"

function normalizeFormation(input: FormationInput): FormationInput {
  return {
    title: input.title.trim(),
    description: input.description?.trim() || null,
    level: input.level?.trim() || null,
    duration: input.duration?.trim() || null,
    is_published: Boolean(input.is_published),
  }
}

export function useFormations() {
  const supabase = useSupabaseClient()

  async function listFormations(options: { onlyPublished?: boolean } = {}) {
    let query = supabase
      .from(TABLE_NAME)
      .select("id,title,description,level,duration,is_published,created_at,updated_at")
      .order("created_at", { ascending: false })

    if (options.onlyPublished) {
      query = query.eq("is_published", true)
    }

    const { data, error } = await query
    if (error) throw error

    return (data || []) as Formation[]
  }

  async function getFormation(id: string | number) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("id,title,description,level,duration,is_published,created_at,updated_at")
      .eq("id", id)
      .single()

    if (error) throw error
    return data as Formation
  }

  async function createFormation(input: FormationInput) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(normalizeFormation(input))
      .select("id,title,description,level,duration,is_published,created_at,updated_at")
      .single()

    if (error) throw error
    return data as Formation
  }

  async function updateFormation(id: string | number, input: FormationInput) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(normalizeFormation(input))
      .eq("id", id)
      .select("id,title,description,level,duration,is_published,created_at,updated_at")
      .single()

    if (error) throw error
    return data as Formation
  }

  async function deleteFormation(id: string | number) {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id)
    if (error) throw error
  }

  return {
    listFormations,
    getFormation,
    createFormation,
    updateFormation,
    deleteFormation,
  }
}
