import React from "react";
import "./../styles/HomePage.less"; // Ensure you have a corresponding LESS file

const HomePage = () => {
  return (
    <div class="home-container">
      <header class="home-header">
        <h1 class="text-4xl font-bold text-gray-800">Welcome to Our Site</h1>
        <p class="text-lg text-gray-600 mt-4">
          Your one-stop solution for all things awesome.
        </p>
      </header>

      <section class="home-features">
        <div class="feature">
          <h2 class="text-2xl font-semibold mb-2">Feature 1</h2>
          <p class="text-gray-600">Description of Feature 1 goes here.</p>
        </div>
        <div class="feature">
          <h2 class="text-2xl font-semibold mb-2">Feature 2</h2>
          <p class="text-gray-600">Description of Feature 2 goes here.</p>
        </div>
        <div class="feature">
          <h2 class="text-2xl font-semibold mb-2">Feature 3</h2>
          <p class="text-gray-600">Description of Feature 3 goes here.</p>
        </div>
      </section>

      <footer class="home-footer">
        <p>© 2023 Our Awesome Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
