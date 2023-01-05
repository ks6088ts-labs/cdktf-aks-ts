// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { App } from "cdktf";
import { AksStack } from "./lib/aks-stack";

const projectPrefix = "cdktfaksts";
const app = new App();

// ----------------------- Load context variables ------------------------------
// Environment Key (dev,stage,prod...)
// Should be defined in 2nd level of "context" tree in cdktf.json
const envKey = process.env.CDKTF_ENVIRONMENT;
if (envKey == undefined)
  throw new Error(
    `Please specify CDKTF_ENVIRONMENT`
  );

const clientId = process.env.CDKTF_CLIENT_ID
if (clientId == undefined)
throw new Error(
  `Please specify CDKTF_CLIENT_ID`
);

const clientSecret = process.env.CDKTF_CLIENT_SECRET
if (clientSecret == undefined)
throw new Error(
  `Please specify CDKTF_CLIENT_SECRET`
);

// Array of environment variables. These values should be defined in cdktf.json
const envVals = app.node.tryGetContext(envKey);
if (envVals == undefined) throw new Error("Invalid environment.");

// Create stacks
new AksStack(app, "cdktf-aks-ts", {
  prefix: projectPrefix,
  location: envVals["aksStack"]["location"],
  clientId: clientId,
  clientSecret: clientSecret,
});

app.synth();
