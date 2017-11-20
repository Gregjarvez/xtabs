export const onDelete = (state = [], action) => {
  const update = [...state];
  update.splice(
    state.findIndex(tab => tab.id === action.payload),
    1
  );
  return update;
};
export const onSave = (state = [], action) => {
  const payload = load => (Array.isArray(load) ? load : [load]);
  return [
    ...payload(action.payload),
    ...state
  ];
};
