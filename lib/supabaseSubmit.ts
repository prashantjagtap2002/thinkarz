import { createClient } from '@/utils/supabase/client';

export async function submitToSupabase(payload: Record<string, any>): Promise<boolean> {
  try {
    const supabase = createClient();
    
    // Convert undefined to null for Supabase JSON compatibility
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).map(([k, v]) => [k, v === undefined ? null : v])
    );
    
    const formType = cleanPayload.form_type;
    let tableName = '';

    // Map form types to their corresponding Supabase table names
    if (formType === 'Sell Your Car / Valuation Form') tableName = 'sell_your_car_valuation_form';
    else if (formType === 'Contact Us Form') tableName = 'contact_us_form';
    else if (formType === 'Book a Test Drive Form') tableName = 'book_a_test_drive_form';
    else if (formType === 'Make an Offer / Buy Enquiry Modal') tableName = 'make_an_offer_buy_enquiry_modal';
    else if (formType === 'Newsletter Signup') tableName = 'newsletter_signup';
    else {
      console.warn('Unknown or missing form type, dropping submission:', formType);
      return false;
    }
    
    // We pass the raw payload directly. Supabase will map matching JSON keys to table columns.
    // Any extra keys that don't match a column will just be ignored by Supabase automatically (if the table doesn't have them).
    
    // For consistency with the Google Sheets columns, let's map standard names based on the form type
    const dataToInsert: Record<string, any> = {
      utm_source: cleanPayload.utm_source || null,
      utm_medium: cleanPayload.utm_medium || null,
      utm_campaign: cleanPayload.utm_campaign || null,
      utm_term: cleanPayload.utm_term || null,
      utm_content: cleanPayload.utm_content || null,
      page_url: cleanPayload.page_url || null,
    };

    if (tableName === 'sell_your_car_valuation_form') {
      dataToInsert.registration_number = cleanPayload.registration_number || cleanPayload.regNumber || null;
      dataToInsert.brand = cleanPayload.brand || cleanPayload.make || cleanPayload.carModel || null;
      dataToInsert.model = cleanPayload.model || cleanPayload.carModel || null;
      dataToInsert.year = cleanPayload.year || null;
      dataToInsert.kms_driven = cleanPayload.kms_driven || cleanPayload.kms || null;
      dataToInsert.fuel_type = cleanPayload.fuel_type || cleanPayload.fuelType || null;
      dataToInsert.phone = cleanPayload.phone || null;
    } else if (tableName === 'contact_us_form') {
      dataToInsert.name = cleanPayload.name || cleanPayload.fullName || null;
      dataToInsert.phone = cleanPayload.phone || null;
      dataToInsert.email = cleanPayload.email || null;
      dataToInsert.subject = cleanPayload.subject || null;
      dataToInsert.message = cleanPayload.message || null;
    } else if (tableName === 'book_a_test_drive_form') {
      dataToInsert.car_model = cleanPayload.car_model || cleanPayload.carModel || null;
      dataToInsert.preferred_date = cleanPayload.preferred_date || cleanPayload.date || null;
      dataToInsert.preferred_time = cleanPayload.preferred_time || cleanPayload.time || null;
      dataToInsert.name = cleanPayload.name || cleanPayload.fullName || null;
      dataToInsert.phone = cleanPayload.phone || null;
      dataToInsert.email = cleanPayload.email || null;
    } else if (tableName === 'make_an_offer_buy_enquiry_modal') {
      dataToInsert.car_id = cleanPayload.car_id || cleanPayload.carId || null;
      dataToInsert.car_model = cleanPayload.car_model || cleanPayload.carModel || null;
      dataToInsert.offer_price = cleanPayload.offer_price || cleanPayload.offerPrice || cleanPayload.offer || null;
      dataToInsert.name = cleanPayload.name || cleanPayload.fullName || null;
      dataToInsert.phone = cleanPayload.phone || null;
      dataToInsert.email = cleanPayload.email || null;
    } else if (tableName === 'newsletter_signup') {
      dataToInsert.email = cleanPayload.email || null;
    }

    const { error } = await supabase
      .from(tableName)
      .insert([dataToInsert]);

    if (error) {
      console.error(`Error inserting into Supabase table ${tableName}:`, error.message);
      return false;
    }
    
    console.log(`Successfully posted lead to Supabase table: ${tableName}`);
    return true;
  } catch (error) {
    console.error('Error submitting lead to Supabase:', error);
    return false;
  }
}
