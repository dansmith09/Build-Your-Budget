// get saved expenses from LS
export const getSavedExpenseIds = () => {
    const savedExpenseIds = localStorage.getItem('saved_expenses') ? JSON.parse(localStorage.getItem('saved_expenses'))
    : [];
    return savedExpenseIds;
}
// saved expense to LS
export const saveExpenseIds = (expenseIdArr) => {
    if (expenseIdArr.length) {
        localStorage.setItem('saved_expenses', JSON.stringify(expenseIdArr));
      } else {
        localStorage.removeItem('saved_expenses');
      }
}
// remove expense from LS
export const removeExpenseId = (expenseId) => {
    const savedExpensesIds = localStorage.getItem('saved_expenses')
      ? JSON.parse(localStorage.getItem('saved_expenses'))
      : null;
  
    if (!savedExpensesIds) {
      return false;
    }
  
    const updatedSavedExpensesIds = savedExpensesIds?.filter((savedExpenseId) => savedExpenseId !== expenseId);
    localStorage.setItem('saved_expenses', JSON.stringify(updatedSavedExpensesIds));
  
    return true;
  };