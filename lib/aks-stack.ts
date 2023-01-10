import { Construct } from "constructs";
import { TerraformOutput, TerraformStack } from "cdktf";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { KubernetesCluster } from "@cdktf/provider-azurerm/lib/kubernetes-cluster";

export interface AksStackProps {
  prefix: string;
  location: string;
  clientId: string;
  clientSecret: string;
}

export class AksStack extends TerraformStack {
  constructor(scope: Construct, id: string, props: AksStackProps) {
    super(scope, id);

    const prefix = props.prefix;
    const location = props.location;

    new AzurermProvider(this, "provider-azurerm", {
      features: {},
    });

    const resourceGroup = new ResourceGroup(this, `${prefix}-rg`, {
      name: `${prefix}-rg`,
      location: location,
    });

    const k8sCluster = new KubernetesCluster(this, "k8s-cluster", {
      dnsPrefix: `${prefix}cluster`,
      location: location,
      name: `${prefix}cluster`,
      resourceGroupName: resourceGroup.name,
      defaultNodePool: {
        name: `${prefix}np`,
        vmSize: "Standard_DS2_v2",
        nodeCount: 1,
      },
      servicePrincipal: {
        clientId: props.clientId,
        clientSecret: props.clientSecret,
      }
    });

    new TerraformOutput(this, "output-aks", {
      value: k8sCluster.name,
    });
  }
}
