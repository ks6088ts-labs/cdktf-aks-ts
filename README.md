# Get it running

```shell
# create service principal for AKS cluster
az ad sp create-for-rbac --name aksStackPrincipal

# set environment variable
# should be `dev | prod`
export CDKTF_ENVIRONMENT=<type your value>
# set <appId> of the `create-for-rbac` output
export CDKTF_CLIENT_ID=<type your value>
# set <password> of the `create-for-rbac` output
export CDKTF_CLIENT_SECRET=<type your value>

# Generate the terraform deployment file
cdktf synth

# Run the diff to see planned changes
cdktf diff

# Run terraform apply using the generated deployment file
cdktf deploy

# Destroy the deployment using
cdktf destroy
```

# References

- [Install CDK for Terraform and Run a Quick Start Demo](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install)
- [Deploy Azure Kubernetes Service (AKS) using TypeScript](https://markwarneke.me/2020-07-23-Deploy-AKS-Kubernetes-Using-TypeScript-Terraform-CDK/)
- [Use a service principal with Azure Kubernetes Service (AKS) / Manually create a service principal](https://learn.microsoft.com/en-us/azure/aks/kubernetes-service-principal?tabs=azure-cli#manually-create-a-service-principal)
