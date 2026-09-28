import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl'; // using publishable key

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  console.log('Attempting to login test user...');
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'aluno@teste.com',
    password: '123456',
  });

  if (error) {
    console.error('Login error:', error.message);
  } else {
    console.log('Successfully logged in!', data.user.email);
  }
}

testLogin();
