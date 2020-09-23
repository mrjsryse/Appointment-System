import React from "react";
import axios from "axios";
import { Modal, Icon, Popup, Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminResetPasswordModal extends React.Component {
    state = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    handleOpen = () => this.props.handleModal("admin-reset-password");

    handleClose = () => this.props.handleModal("none");

    handleModal(name) {
        this.props.handleModal(name);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: "admin",
            newPassword: this.state.newPassword,
        };
        axios.post("admin/updateAccountPassword", data).then((res) => {
            console.log(res);
            console.log(res.data);
        });
        this.handleClose();
        setTimeout(() => {
            toast({
                type: "success",
                title: "Success",
                description: <p>"Password successfully reset"</p>,
                icon: "check",
            });
        }, 1000);
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        let open;

        if (this.props.activeModal === "admin-reset-password") {
            open = true;
        } else {
            open = false;
        }
        return (
            <Modal
                closeIcon
                size="mini"
                id="reset-password-modal"
                onClose={() => {
                    this.handleClose();
                }}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Modal.Header as="h2">
                    <Icon name="edit"></Icon>
                    Edit Admin Password
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required id="current-password-field">
                            <label>Current Password</label>
                            <Input
                                name="currentPassword"
                                type="password"
                                id="current-password"
                                autoComplete="false"
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field required id="new-password-field">
                            <label>New Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        name="newPassword"
                                        type="password"
                                        id="new-password"
                                        autoComplete="false"
                                        placeholder="New Password"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="confirm-new-password-field">
                            <label>Confirm New Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        name="confirmNewPassword"
                                        type="password"
                                        id="confirm-new-password"
                                        autoComplete="false"
                                        placeholder="Confirm New Password"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        icon
                        labelPosition="left"
                        color="green"
                        id="save-password"
                        onClick={this.handleSubmit}
                    >
                        <Icon name="check" />
                        CONFIRM
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminResetPasswordModal;
