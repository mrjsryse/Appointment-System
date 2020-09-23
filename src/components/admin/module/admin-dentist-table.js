import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import axios from "axios";

class AdminDentistTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dentists: [],
        };
    }

    handleShowDimmer = () => this.props.handleShowDimmer();
    handleHideDimmer = () => this.props.handleHideDimmer();

    handleModal(name, processname) {
        this.props.handleModal(name, processname);
    }

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleStatus = (e, { datakey, status }) => {
        let data;

        if (status === "Active") {
            console.log("active");
            data = {
                doctorID: datakey,
                status: "Inactive",
            };
        } else {
            data = {
                doctorID: datakey,
                status: "Active",
            };
        }
        axios.post("admin/updateDentistStatus", data).then((response) => {
            this.handleUpdateTable();
        });
    };

    render() {
        let { dentists } = this.props;
        return (
            <Table sortable singleLine selectable id="table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Login</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Status
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Schedule
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dentists.map(
                        ({
                            key,
                            firstname,
                            lastname,
                            status,
                            lastLogin,
                            username,
                        }) => (
                            <Table.Row key={key}>
                                <Table.Cell>{firstname}</Table.Cell>
                                <Table.Cell>{lastname}</Table.Cell>
                                <Table.Cell>{lastLogin}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    {status === "Active" && (
                                        <Button
                                            color="green"
                                            datakey={key}
                                            status={status}
                                            onClick={this.handleStatus}
                                        >
                                            Active
                                        </Button>
                                    )}
                                    {status === "Inactive" && (
                                        <Button
                                            datakey={key}
                                            status={status}
                                            onClick={this.handleStatus}
                                        >
                                            Inactive
                                        </Button>
                                    )}
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button color="green">View</Button>
                                </Table.Cell>
                                <Table.Cell textAlign="right">
                                    <Icon
                                        name="edit"
                                        size="large"
                                        onClick={() =>
                                            this.handleModal(
                                                "admin-edit-dentist",
                                                { key, firstname, lastname }
                                            )
                                        }
                                    ></Icon>
                                    <Icon
                                        name="trash"
                                        size="large"
                                        onClick={() =>
                                            this.handleModal(
                                                "admin-delete-dentist",
                                                { key, firstname, lastname }
                                            )
                                        }
                                    ></Icon>
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body>
            </Table>
        );
    }
}

export default AdminDentistTable;
