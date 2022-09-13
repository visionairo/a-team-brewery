import React from "react"

type SearchTerm = {
  searchTerm: string;
}

const Table = ({ searchTerm }:SearchTerm) => (
<>

<h2>{searchTerm}</h2>
  <table className='w-full text-left text-xs border border-gray-300 shadow-sm pl-32'>
    <tbody className='text-black w-full'>
      <tr className=' border border-gray-200 uppercase'>
        <th>Name</th>
        <th>City</th>
        <th>Country</th>
        <th>Street</th>
        <th>-</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>Sao Paulo</td>
        <td>Country</td>
        <td>Street</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>Bogota</td>
        <td>Country</td>
        <td>Street</td>
        <td>-</td>
      </tr><tr>
        <td>Name</td>
        <td>Amsterdam</td>
        <td>Country</td>
        <td>Street</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
  </>
)

export default Table