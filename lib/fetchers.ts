import { supabase } from './supabaseClient'

export async function getFeaturedStaff() {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('is_featured', true)
    .limit(6)

  if (error) {
    console.error('Error fetching featured staff:', error)
    return []
  }

  return data
}

export async function getSchoolMetadata() {
  const { data, error } = await supabase
    .from('school_metadata')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching school metadata:', error)
    return null
  }

  return data
}

export async function getLatestPosts(limit = 3) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data
}

export async function getAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('number', { ascending: false })

  if (error) {
    console.error('Error fetching achievements:', error)
    return []
  }

  return data
}

export async function getPKSections() {
  const { data, error } = await supabase
    .from('pk_sections')
    .select('*')

  if (error) {
    console.error('Error fetching PK sections:', error)
    return []
  }

  return data
}
