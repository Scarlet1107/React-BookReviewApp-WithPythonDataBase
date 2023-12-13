describe("入力フォームのテスト", () => {
  it("入力値に不備がある場合はエラーメッセージが表示される", () => {
    // 入力フォームに不備のある値を入力する
    cy.get("input[name='email']").type("invalid-email");
    cy.get("input[name='password']").type("invalid-password");

    // 送信ボタンをクリックする
    cy.get("button").click();

    // エラーメッセージが表示されることを確認する
    cy.get(".error-message").should("exist");
  });

  it("入力値に不備がなければエラーメッセージが表示されない", () => {
    // 入力フォームに正しい値を入力する
    cy.get("input[name='email']").type("valid-email");
    cy.get("input[name='password']").type("valid-password");

    // 送信ボタンをクリックする
    cy.get("button").click();

    // エラーメッセージが表示されないことを確認する
    cy.get(".error-message").should("not.exist");
  });
});