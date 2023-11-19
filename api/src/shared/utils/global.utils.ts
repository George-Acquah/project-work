function extractToken(authHeader: string | undefined) {
  if (authHeader && authHeader.split(' ')[0] === 'Reservation') {
    console.log('passed');
    return authHeader.split(' ')[1];
  }

  return 'invalid-token';
}

export { extractToken };
