describe('フォームのバリデーションテスト', () => {
    beforeEach(() => {
      cy.visit(process.env.REACT_APP_BASE_URL); // ここにテストしたいReactアプリのURLを設定します
    });
  
    it('不正なメールアドレスを入力するとエラーメッセージが表示される', () => {
      cy.get('input[name="email"]').type('invalid-email'); // メールアドレス入力フィールドのセレクタを適宜調整してください
      cy.get('form').submit();
      cy.get('#email_error-message').should('be.visible'); // エラーメッセージを表示する要素のセレクタを適宜調整してください
    });
  
    it('有効なメールアドレスを入力するとエラーメッセージが表示されない', () => {
      cy.get('input[name="email"]').type('test@example.com'); // メールアドレス入力フィールドのセレクタを適宜調整してください
      cy.get('form').submit();
      cy.get('#email_error-message').should('not.exist'); // エラーメッセージを表示する要素のセレクタを適宜調整してください
    });
  });
  

  