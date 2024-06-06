/** @odoo-module **/
/* global Plaid */
import {registry} from "@web/core/registry";

export async function plaid_login(env, action) {
    const handler = Plaid.create({
        clientName: "Plaid Quickstart",
        product: ["transactions"],
        onSuccess: (public_token) => {
            console.log(env, action);
            env.services.orm.call(
                "online.bank.statement.provider",
                "plaid_create_access_token",
                [false, public_token, action.context.active_id]
            );
        },
        countryCodes: ["US", "ES"],
        language: "es",
        token: action.args.token,
    });
    handler.open();
}

registry.category("actions").add("plaid_login", plaid_login);
