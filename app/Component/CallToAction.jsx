export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col items-center sm:items-start">
        <h2 className="text-2xl font-semibold">
          Want to learn more about JavaScript?
        </h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 JavaScript Projects
        </p>
        <a
          href="https://www.100jsprojects.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-tl-xl rounded-bl-none transition hover:opacity-90">
            100 JavaScript Projects
          </button>
        </a>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="JavaScript"
          className="rounded-xl w-full object-cover max-h-60"
        />
      </div>
    </div>
  );
}
