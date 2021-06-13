import * as React from 'react';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useState } from 'react';
import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import categoryHttp from '../../util/http/category-http';
import { BadgeNo, BadgeYes } from '../../components/Badge';
import { Link } from 'react-router-dom';
import { Category, ListResponse } from '../../util/models';

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: 'id',
        label: 'id',
        options: {
            display: false
        }
    },
    {
        name: 'is_active',
        label: 'Ativo',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value ? <BadgeYes /> : <BadgeNo />;
            }
        }
    },
    {
        name: 'name',
        label: 'Nome',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <Link to={`/categories/${tableMeta.rowData[0]}/edit`}>{value}</Link>;
            }
        }
    },
    {
        name: 'created_at',
        label: 'Criado em',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy HH:mm')}</span>;
            }
        },
    },
]

const Table = () => {

    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        let isSubscribed = true;
        (async () => {
            const { data } = await categoryHttp.list<ListResponse<Category>>();
            if (isSubscribed)
                setData(data.data);
        })();

        return () => {
            isSubscribed = false;
        }
    }, [])

    return (
        <MUIDataTable
            title="Listagem de categorias"
            columns={columnsDefinition}
            data={data}
        >
        </MUIDataTable>
    )
};

export default Table;