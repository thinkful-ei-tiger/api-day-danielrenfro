const items = [];
let error = null;
let hideCheckeditems = false;

const findById = function (id) {
  return items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  items.push(item);
};

const findAndUpdate = function (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData)
}

const findAndDelete = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

const setError = function (error) {
  this.error = error;
}

export default {
  items,
  hideCheckeditems,
  findById,
  addItem,
  findAndDelete,
  toggleCheckedFilter, 
  findAndUpdate,
  setError
};