export const sendVerificationEmail = async (
    email,
    token
  ) => {
  
    console.log(`
    VERIFY EMAIL:
  
    http://localhost:3000/auth/verify/${token}
  
    sent to ${email}
    `);
  
  };