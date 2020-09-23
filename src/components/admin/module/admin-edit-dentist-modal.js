import React from "react";
import axios from "axios";
import {
    Modal,
    Icon,
    Popup,
    Button,
    Form,
    Input,
    Message,
} from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminEditDentistModal extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
        error: {
            firstname: false,
            lastname: false,
            username: false,
            password: false,
            confirmPassword: false,
        },
    };

    handleOpen = () => this.props.handleModal("admin-edit-dentist");

    handleClose = () => this.props.handleModal("none");

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleSubmit = (event, { datakey }) => {
        event.preventDefault();
        if (this.handleValidation()) {
            const data = {
                doctorID: datakey,
                firstname: this.state.firstname.trim(),
                lastname: this.state.lastname.trim(),
                password: this.state.password.trim(),
            };
            axios.post("admin/editDentist", data).then((res) => {
                this.handleClose();
                setTimeout(() => {
                    toast({
                        type: "success",
                        title: "Success",
                        description: <p>Dentist successfully edited</p>,
                        icon: "check",
                    });
                }, 1000);
                this.handleUpdateTable();
            });
        }
    };

    handleValidation() {
        const checkfirst = /^[a-z A-Z]+$/; //regex for valid firstname
        const checklast = /^[a-z A-Z.\-_]+$/; //regex for valid lastname
        const checkPassword = /^[0-9a-zA-Z]+$/;

        let firstname = this.state.firstname.trim();
        let lastname = this.state.lastname.trim();
        let password = this.state.password.trim();
        let confirmPassword = this.state.confirmPassword.trim();
        let error = this.state.error;
        let formIsValid = true;

        if (firstname === "" || !firstname.match(checkfirst)) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid firstname</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (firstname.length < 2) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Firstname is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!firstname.match(checkfirst)) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid firstname format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        if (lastname === "" || !firstname.match(checklast)) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid lastname</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (lastname.length < 2) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Lastname is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!lastname.match(checklast)) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid lastname format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        if (password === "") {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid password</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password !== confirmPassword) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Passwords do not match</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!password.match(checkPassword)) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Incorrect password format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password.length < 10) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password.length > 32) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too long</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        this.setState({ error: error });

        return formIsValid;
    }

    componentDidMount() {
        if (this.props.data != null) {
            let datakey = this.props.data.key;
            axios.post("admin/getUser", { doctorID: datakey }).then((res) => {
                if (res.data.user != null) {
                    this.setState({
                        username: res.data.user.username,
                    });
                }
            });
        }
    }
    render() {
        let open;

        const icon_styling = {
            marginRight: 13.5 + "px",
        };

        if (this.props.activeModal === "admin-edit-dentist") {
            open = true;
        } else {
            open = false;
        }

        let firstname;
        let lastname;
        let key;
        if (
            this.props.data != null &&
            this.props.data.firstname != null &&
            this.props.data.lastname != null
        ) {
            key = this.props.data.key;
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
        }

        return (
            <Modal
                closeIcon
                size="mini"
                id="edit-dentist-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Modal.Header as="h2">
                    <Icon name="edit"></Icon>
                    Edit Dentist
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required id="edit-firstname-field-dentist">
                            <label>First Name</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.firstname}
                                        name="firstname"
                                        id="edit-firstname-dentist"
                                        autoComplete="false"
                                        placeholder="First Name"
                                        onChange={this.handleChange}
                                        value={firstname}
                                    />
                                }
                                content="Name should contain at least 2 characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="edit-lastname-field-dentist">
                            <label>Last Name</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.lastname}
                                        name="lastname"
                                        id="edit-lastname-dentist"
                                        autoComplete="false"
                                        placeholder="Last Name"
                                        onChange={this.handleChange}
                                        value={lastname}
                                    />
                                }
                                content="Name should contain at least 2 characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="edit-username-field-dentist">
                            <label>Username</label>
                            <Message id="edit-username-dentist">
                                {this.state.username}
                            </Message>
                        </Form.Field>
                        <Form.Field required id="edit-password-field-dentist">
                            <label>Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.password}
                                        name="password"
                                        type="password"
                                        id="edit-password-dentist"
                                        autoComplete="false"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field
                            required
                            id="edit-confirm-password-field-dentist"
                        >
                            <label>Confirm Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.confirmPassword}
                                        name="confirmPassword"
                                        type="password"
                                        id="edit-confirm-password-dentist"
                                        autoComplete="false"
                                        placeholder="Password"
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
                        id="edit-dentist-button"
                        onClick={this.handleSubmit}
                    >
                        <Icon name="check" />
                        SAVE CHANGES
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminEditDentistModal;
