// Test the extend functionality
let ExtendedClass = NSObject.extend({
  customMethod: function () {
    console.log("Custom method called!");
    return "Hello from extended class";
  },

  description: function () {
    return "This is an extended NSObject";
  },
});

// Test with protocols
let ExtendedWithProtocol = NSObject.extend(
  {
    customMethod: function () {
      console.log("Custom method with protocol called!");
      return "Hello from extended class with protocol";
    },
  },
  {
    protocols: [], // Add protocol references here if needed
  }
);

// Create instances and test
let instance1 = new ExtendedClass();
console.log("Instance 1 custom method:", instance1.customMethod());
console.log("Instance 1 description:", instance1.description());

let instance2 = new ExtendedWithProtocol();
console.log("Instance 2 custom method:", instance2.customMethod());

console.log("Test completed successfully!");
