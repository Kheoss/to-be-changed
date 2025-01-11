Hardening Besu => Hardening European Root of Trust 

Setup to replicate CVE-2022-36025 in a BESU network with 4 validators WITH QBFT, 
This setup is as similar as possible with the one described by EBSI whitepapers 
( as per my understanding) 


Besu Hyperledger versions in use:
- 22.4.2 as a vulnerable version
- 22.7.1 as a patched version [benchmark]

__genesis.json__ defines a QBFT consensus network


Create 4 validators nodes:
- RPC points on ports 8541...8544
- Metric points on 9541...9544

Validator 1 (0x3f3c2645815f59857b0f7507ccb001769f65cc54):
- Acc: 0x2f140E87352B1fF61492887cB658Ae8567815Ca1
- PK: 0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d
Validator 2 (0x4eb2d1160dd181d354c4065f128c2218feb19fa2):
- Acc: 0x69346A088dDA3A1719Fa7cF17Be8BAfe6c65ab4c
- PK: 0xe30750a31da83ad8247386d3f8a52b0049357fe423f4f7a9492853eea6a09c06
Validator 3 (0x87401b92fce9cf00015e4cf38d6db05f6003088c):
- Acc:0xb5a33962e49d461dcc6304D2d8476CCBE662c3Fb
- PK: 0xc7cee57ffe234a6f1f046edfa035901185d2602a22c9b65d06bc0be3b478a881
Validator 4 (0xdd47bca95d975b0f4e3a8f577c37cf5c872d0d39):
- Acc: 0x8A877fc2db2b44206b44C1d2846724a1A23dBF91
- PK: 0x405ee93e6f513bc76c999a720dd353146dbec576fc45e445039b6e7d1f2fbd96


Sprint 1:

Methodology:

- Fund validators
- Create a target contract. [See TargetContract.sol]
- Use Validator 1 RPC endpoint (8541) to deploy the compiled target contract and retreive the contact address [See deploy_target.js].
- Create a mallicious contract to call a target contract and manipulate gas cost. [See MalliciousContract.sol]
 

Cleanup (preserving private keys):
- ./cleanup.sh 




Sprint 2:

Methodology:

- Add logstash, filebeat, elasticsearch and kibana to the network
- Refine log inputs using filebeat