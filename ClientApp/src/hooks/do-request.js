import axios from 'axios';
import { useState } from 'react';

const DoRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = { withCredentials: true }) => {
    try {
      console.log({ ...body, ...props });
      setErrors(null);
      const response = await axios[method](url, { ...body }, { ...props });
      console.log(onSuccess);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      // if (err.response.status === 429) {
      //   return setErrors(['Too many requests, please try again later']);
      // }
      setErrors(err.response.data.errors.map((err) => err.message));
    }
  };

  return { doRequest, errors };
};

export default DoRequest;
