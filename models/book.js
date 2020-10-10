//Book items won't be in their own separate collection
//They are instead just objects we build and pass into 
//our List's nested "list" array for using later

//Not sure if I'll use this yet

const BookSchema = {
    bookId: { required: true },
    title: { required: true},
    rating: { required: false },
    status: { required: true }
  };
  exports.BookSchema = BookSchema;