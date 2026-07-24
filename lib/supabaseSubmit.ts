import { createClient } from '@/utils/supabase/client';

export async function submitToSupabase(payload: Record<string, any>): Promise<boolean> {
  try {
    const supabase = createClient();
    
    // Convert undefined to null for Supabase JSON compatibility
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).map(([k, v]) => [k, v === undefined ? null : v])
    );
    
    // Add raw payload to a JSONB column to ensure no fields are lost
    // while also flattening known fields for easier querying
    const dataToInsert = {
      form_type: cleanPayload.form_type || 'Unknown Form',
      name: cleanPayload.name || cleanPayload.fullName || null,
      email: cleanPayload.email || null,
      phone: cleanPayload.phone || null,
      message: cleanPayload.message || null,
      car_model: cleanPayload.car_model || cleanPayload.carModel || cleanPayload.model || cleanPayload.model_preference || null,
      car_brand: cleanPayload.brand || cleanPayload.make || cleanPayload.brand_preference || null,
      utm_source: cleanPayload.utm_source || null,
      utm_medium: cleanPayload.utm_medium || null,
      utm_campaign: cleanPayload.utm_campaign || null,
      utm_term: cleanPayload.utm_term || null,
      utm_content: cleanPayload.utm_content || null,
      page_url: cleanPayload.page_url || null,
      raw_data: cleanPayload // stores all dynamic fields
    };

    const { error } = await supabase
      .from('leads')
      .insert([dataToInsert]);

    if (error) {
      console.error('Error inserting into Supabase:', error.message);
      return false;
    }
    
    console.log('Successfully posted lead to Supabase');
    return true;
  } catch (error) {
    console.error('Error submitting lead to Supabase:', error);
    return false;
  }
}
