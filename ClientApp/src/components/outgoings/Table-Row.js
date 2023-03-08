import { Fragment } from 'react';
import axios from 'axios';
import { getCurrencySymbol, numberWithCommas } from '../../Utils';

const TableRow = ({ outgoing, currentUser, getUserRecords }) => {
  const deleteItemHandler = async () => {
    await axios.delete(`/api/finances/outgoings`, {
      headers: { item: outgoing.item, userid: +outgoing.userId },
      withCredentials: true,
    });
    getUserRecords(currentUser.email);
  };

  return (
    <Fragment>
      <tr>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {outgoing.item}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {`${getCurrencySymbol(outgoing.currency)}${numberWithCommas(
            outgoing.cost
          )}`}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {outgoing.tag}
        </td>
        {/* <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
          <a
            className="text-green-500 hover:text-green-700"
            href="#"
          >
            Edit
          </a>

          </td> */}

        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal text-right'>
          <div
            className='text-red-500 hover:text-red-700'
            onClick={(e) => deleteItemHandler()}
          >
            Delete
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default TableRow;
