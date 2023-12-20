import {Badge} from "antd";
import React, {ReactNode} from "react";

export type iColumnTable = {
  key: string,
  title: string,
  fileType: string,
  docType: string,
  owner: string,
  lastModified: string,
  created: string,
  status: ReactNode,
}

export const searchTableData: iColumnTable[] = [
  {
    key: '1',
    title: 'John Brown',
    fileType: 'PDF',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '29 Oct, 2023',
    created: '09 Oct, 2023',
    status: <Badge status="success" text="Approved" />,
  },
  {
    key: '2',
    title: 'Jim Green',
    fileType: 'ZIP',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '11 Oct, 2023',
    status: <Badge status="error" text="Blocked" />
  },
  {
    key: '3',
    title: 'Joe Black',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '12 Oct, 2023',
    status: <Badge color={'blue'} text='Draft' />
  },
  {
    key: '4',
    title: 'Jim Red',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '12 Oct, 2023',
    created: '13 Oct, 2023',
    status: <Badge status={'warning'} text='Submitted' />
  },
  {
    key: '11',
    title: 'John Brown',
    fileType: 'PDF',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status="success" text="Approved" />,
  },
  {
    key: '21',
    title: 'Jim Green',
    fileType: 'ZIP',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '09 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status="error" text="Blocked" />
  },
  {
    key: '35',
    title: 'Joe Black',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge color={'blue'} text='Draft' />
  },
  {
    key: '41',
    title: 'Jim Red',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status={'warning'} text='Submitted' />
  },
  {
    key: '26',
    title: 'John Brown',
    fileType: 'PDF',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '09 Oct, 2023',
    status: <Badge status="success" text="Approved" />,
  },
  {
    key: '22',
    title: 'Jim Green',
    fileType: 'ZIP',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status="error" text="Blocked" />
  },
  {
    key: '23',
    title: 'Joe Black',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge color={'blue'} text='Draft' />
  },
  {
    key: '24',
    title: 'Jim Red',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status={'warning'} text='Submitted' />
  },
  {
    key: '31',
    title: 'John Brown',
    fileType: 'PDF',
    docType: 'Document',
    owner: 'John Brown',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status="success" text="Approved" />,
  },
  {
    key: '42',
    title: 'Jim Green',
    fileType: 'ZIP',
    docType: 'Document',
    owner: 'John Brown2 ',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status="error" text="Blocked" />
  },
  {
    key: '43',
    title: 'Joe Black',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown qwe',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge color={'blue'} text='Draft' />
  },
  {
    key: '44',
    title: 'Jim Red',
    fileType: "DOC",
    docType: 'Label',
    owner: 'John Brown sd',
    lastModified: '19 Oct, 2023',
    created: '19 Oct, 2023',
    status: <Badge status={'warning'} text='Submitted' />
  },
];
