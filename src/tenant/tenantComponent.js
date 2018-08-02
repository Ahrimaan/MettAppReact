import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Dropdown } from 'semantic-ui-react'
import { loadTenants, updateTenant } from './actions';
import { isNullOrUndefined } from 'util';

class TenantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedItem: "" }
        this.props.loadTenants();
    }

    componentWillReceiveProps(nextprops) {
        this.setState({ showDialog: isNullOrUndefined(nextprops.tenant.selectedTenant)});
    }


    componentDidMount() {
        this.state = { selectedItem: "", showDialog: isNullOrUndefined(this.props.tenant.selectedTenant) };
    }

    handleChange(event, { value }) {
        this.setState({ selectedItem: value });
    };

    render() {
        const { tenantList } = this.props.tenant;
        const { app } = this.props;

        if (!app.user) {
            return null;
        }

        return (
            <Modal
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
                size='mini'
                open={this.state.showDialog}>
                <Modal.Header>
                    Zuordnung wählen
                </Modal.Header>
                <Modal.Content>
                    {tenantList && (this.renderSelectList(tenantList))}
                    {!tenantList && (
                        <div>
                            <Button disabled loading primary>Loading</Button>
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        loading={false} //change this to global loader if developed
                        disabled={!this.state.selectedItem}
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Save'
                        onClick={this.handleSave = this
                            .handleSave
                            .bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }

    handleSave() {
        this.props.updateTenant(this.state.selectedItem);
    }

    renderSelectList(tenantList) {
        const items = [];
        tenantList.forEach(tenant => {
            items.push({ value: tenant.id, text: tenant.name })
        });
        return <Dropdown
            fluid
            selection
            onChange={this.handleChange = this
                .handleChange
                .bind(this)}
            placeholder="Bitte wähle eine Abteilung"
            options={items} />;
    }
}

function mapStateToProps(props) {
    let newProps = {
        tenant: props.tenant,
        app: props.app
    }
    return newProps;
}

export default connect(mapStateToProps, { loadTenants, updateTenant })(TenantComponent);