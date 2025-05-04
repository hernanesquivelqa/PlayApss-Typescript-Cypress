class InputValidation {
    public url: string;
  
    constructor() {
      this.url = "https://testpages.eviltester.com/styled/validation/input-validation.html";
    }
  
    randomUsername(): string {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
  
    randomAge(): string {
        const age = Math.floor(Math.random() * (80 - 18 + 1)) + 18;
        return age.toString();
      }
  }
  
  export default InputValidation;