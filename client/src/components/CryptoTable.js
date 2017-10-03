import { Component } from 'react';

const CryptoTable = ({
    cryptocurrencies = [],
    columns = [],
    filter = '',
    title = '',
}) => {
    const addTablaData = (cryptocurrency) =>
        Object.keys(cryptocurrency).map((key) => {
            const id = `${filter}-${key}-${generateRandomMunber(cryptocurrency.time)}`;
            return <td key={id}>{cryptocurrency[key]}</td>;
        }
    );

    const generateRandomMunber = (time) =>
        Math.round(Math.random() * (new Date(time).getTime() - 1) + 1);

    return (
        <div className="crypto-table-title">
            <h4>{title}</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            columns.map((column) =>
                                <th key={column}>{column}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            cryptocurrencies.map((cryptocurrency, index) =>
                                <tr key={columns[index]}>{addTablaData(cryptocurrency)}</tr>
                            )
                        }
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
