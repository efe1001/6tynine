import React from "react";

import { Table } from "evergreen-ui";

const UnlockNumber = (props) => {
  return (
    <div align="center">
      <div>
        <Table marginTop={20}>
          <Table.Head height={32}>
            <Table.TextHeaderCell>CONTACT INFORMATION</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            <Table.Row height={32}>
              <Table.TextCell>PHONE NUMBER 1</Table.TextCell>
              <Table.TextCell>{props.data.phone_number_1}</Table.TextCell>
            </Table.Row>
            <Table.Row height={32}>
              <Table.TextCell>PHONE NUMBER 2</Table.TextCell>
              <Table.TextCell>{props.data.phone_number_2}</Table.TextCell>
            </Table.Row>

            <Table.Row height={32}>
              <Table.TextCell>WHATSAPP NUMBER</Table.TextCell>
              <Table.TextCell>{props.data.whatsapp_number}</Table.TextCell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default UnlockNumber;
