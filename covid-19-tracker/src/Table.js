import React from 'react';
import './Table.css';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({ country, cases, deaths, vaccine }) => (
                <tr>
                    <td>
                    <strong>{country}</strong>
                    </td>

                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>

            ))}

        </div>
    )
}

export default Table
