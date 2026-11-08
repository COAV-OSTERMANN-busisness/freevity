Cypress.on("uncaught:exception", (error) => {
    if (
      error.message.includes(
        "Hydration failed because the server rendered text didn't match the client",
      )
    ) {
      return false;
    }
  
    return true;
  });