import { fields } from "../const/data";
import { ChangeEvent, MouseEvent } from "react";

const Form = ({ data, setData, setIsPostVisible }: any) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      return updatedData;
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Post created:", result);

      setIsPostVisible(true);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <form>
        {fields &&
          fields.length > 0 &&
          fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm/6 font-medium text-gray-900"
              >
                {field.label}
                <div className="mt-2">
                  <input
                    className="box-border block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder ?? ""}
                    required={field.required}
                    value={data[field.name] ?? ""}
                    onChange={handleOnChange}
                  />
                </div>
              </label>
            </div>
          ))}
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Form;
