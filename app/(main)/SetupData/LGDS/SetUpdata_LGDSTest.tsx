
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

interface SizeOption {
    label: string;
    value: string;
}

export default function SetUpdata_LGDSTest() {
    const [products, setProducts] = useState<Product[]>([]);
    const [sizeOptions] = useState<SizeOption[]>([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState<string>(sizeOptions[1].value);



    const configuration = [
        {
              id: '1000',
              time: 'f230fh0g3',
              name: 'UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal) UPS MODE (1: UPS Running - 2: Charging - 3: No Battery - 4: Normal)',
              description: 'Product Description',
              image: 'bamboo-watch.jpg',
              FC_1201: 65,
              category: 'Accessories',
              FC_1202: 24,
              inventoryStatus: 'INSTOCK',
              rating: 5,
            },
            {
              id: '1001',
              time: 'nvklal433',
              name: 'Black Watch',
              description: 'Product Description',
              image: 'black-watch.jpg',
              FC_1201: 72,
              category: 'Accessories',
              FC_1202: 61,
              inventoryStatus: 'INSTOCK',
              rating: 4,
            },
            {
              id: '1002',
              time: 'zz21cz3c1',
              name: 'Blue Band',
              description: 'Product Description',
              image: 'blue-band.jpg',
              FC_1201: 79,
              category: 'Fitness',
              FC_1202: 2,
              inventoryStatus: 'LOWSTOCK',
              rating: 3,
            },
            {
              id: '1003',
              time: '244wgerg2',
              name: 'Blue T-Shirt',
              description: 'Product Description',
              image: 'blue-t-shirt.jpg',
              FC_1201: 29,
              category: 'Clothing',
              FC_1202: 25,
              inventoryStatus: 'INSTOCK',
              rating: 5,
            },
            {
              id: '1004',
              time: 'h456wer53',
              name: 'Bracelet',
              description: 'Product Description',
              image: 'bracelet.jpg',
              FC_1201: 15,
              category: 'Accessories',
              FC_1202: 73,
              inventoryStatus: 'INSTOCK',
              rating: 4,
            },
            {
              id: '1005',
              time: 'av2231fwg',
              name: 'Brown Purse',
              description: 'Product Description',
              image: 'brown-purse.jpg',
              FC_1201: 120,
              category: 'Accessories',
              FC_1202: 0,
              inventoryStatus: 'OUTOFSTOCK',
              rating: 4,
            },
       
    ];

    return (
        <div className="card">
       
       <DataTable
        value={configuration}
        columnResizeMode="expand"
        resizableColumns
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="name" header="name"></Column>
        <Column field="FC_1201" header="FC-1201"></Column>
        <Column field="FC_1202" header="FC-1202"></Column>
      </DataTable>
        </div>
    );
}
            