import * as passwordUtils from "../../utils/passwordUtils";

describe("Password Utilities Tests", () => {
  // Test Case: Hash Password
  it("should hash a password", async () => {
    const password = "testpassword";
    const hashedPassword = await passwordUtils.hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe("string");
  });

  // Test Case: Compare Password
  it("should compare a valid password", async () => {
    const password = "testpassword";
    const hashedPassword = await passwordUtils.hashPassword(password);
    const isPasswordValid = await passwordUtils.comparePassword(
      password,
      hashedPassword
    );
    expect(isPasswordValid).toBe(true);
  });

  // Test Case: Compare Invalid Password
  it("should compare an invalid password", async () => {
    const password = "testpassword";
    const hashedPassword = await passwordUtils.hashPassword(password);
    const isPasswordValid = await passwordUtils.comparePassword(
      "wrongpassword",
      hashedPassword
    );
    expect(isPasswordValid).toBe(false);
  });
});
