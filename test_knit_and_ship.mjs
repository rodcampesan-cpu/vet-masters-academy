import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flissmoprpvjdfdwwkxb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaXNzbW9wcnB2amRmZHd3a3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODczMjUsImV4cCI6MjA5NDA2MzMyNX0.32O1cqn0BazasjqsQWtMHZA4qpRyvmPN06zXO1Sxy8Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  console.log('Attempting to create/login test user on knit-and-ship...');
  
  const { data, error } = await supabase.auth.signUp({
    email: 'aluno@teste.com',
    password: '123456',
  });

  if (error) {
    console.error('Signup error:', error.message);
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'aluno@teste.com',
        password: '123456',
    });
    if (loginError) {
        console.error('Login error:', loginError.message);
    } else {
        console.log('Login successful! Password is correct.');
    }
  } else {
    console.log('Signup successful!');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'aluno@teste.com',
        password: '123456',
    });
    if (loginError) {
        console.error('Login error after signup (probably email not confirmed):', loginError.message);
    } else {
        console.log('Login successful after signup! You are good to go.');
    }
  }
}

createTestUser();
