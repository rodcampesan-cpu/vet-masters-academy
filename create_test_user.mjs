import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl'; // using publishable key

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  console.log('Attempting to create/login test user...');
  
  // Try to sign up
  const { data, error } = await supabase.auth.signUp({
    email: 'aluno@teste.com',
    password: '123456',
  });

  if (error) {
    console.error('Signup error (user might already exist):', error.message);
    // If it exists, let's try to see if we can log in with 123456 just in case
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'aluno@teste.com',
        password: '123456',
    });
    if (loginError) {
        console.error('Login error:', loginError.message);
        console.log('\nCould not set the password. Since the user already exists in the database and email confirmations/password resets require admin keys or email access, the client key cannot override the password.');
    } else {
        console.log('Successfully logged in! Password is already 123456.');
    }
  } else {
    console.log('Successfully created test user: aluno@teste.com with password 123456');
  }
}

createTestUser();
