---
categories: development
date: 2024-02-18 20:00:00 +0200
excerpt: >
  How to validate files without preparing
  the local environment only based on CI?
lang: en
layout: post
title: XRechnung Validation with GitHub Actions
---

**XRechnung** is a standard electronic invoicing format used in Germany,
based on the Universal Business Language (UBL).
**UBL** provides a common structure for electronic business documents,
facilitating efficient data exchange between systems.
The goal of the XRechnung format is to standardize electronic invoices
in Germany to facilitate their exchange between businesses
and ensure compliance with legal and tax regulations.

My task was to validate the accuracy of XML output files
in the XRechnung format.
Although I found an
[KoSIT validator](https://github.com/itplr-kosit/validator),
it lacked a proper XSD file.
XSD (XML Schema Definition) is a language for defining the structure
and constraints of XML documents.
XSD files can be used to validate the correctness of XML files.
Instead, the found tool validated XML documents using XML Schema
and Schematron.
The KoSIT Validator is a general tool for XML files.
To use it for the XRechnung standard,
I needed to apply a
[Validator Configuration for XRechnung](https://github.com/itplr-kosit/validator-configuration-xrechnung).

The validator is written in Java.
The released files are zip archives containing jar files.
All of this complicates setting up the environment a bit.
The validator won't work without the correct configuration.

I've decided that the best solution will be running the validator on CI.
Running the validator on CI has the benefit of skipping
the need to configure the environment on local machines.
GitHub Actions allows for inputs,
so we can specify the name of the file being checked.
In case of failure, reports are generated.
These files are shared as artifacts.

Below you can find the workflow content:

<!-- markdownlint-disable MD013 -->
```yaml
name: XRechnung Validator
on:
  workflow_dispatch:
    inputs:
      file:
        default: './invoice-valid.xml'
        description: 'XML file to validation'
        required: true
      validator_version:
        default: '1.5.0'
        description: 'KoSIT Validator version'
        options:
          - '1.5.0'
        required: true
        type: choice

jobs:
  validation_tool:
    env:
      INPUT_FILE: ${{ inputs.file }}
      VALIDATOR_VERSION: ${{ inputs.validator_version }}
      VALIDATOR_JAR_FILE: "validationtool-${{ inputs.validator_version }}-standalone.jar"
    name: Validation tool
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4
      - name: Check if the input file exists
        run: |
          if [[ -f "$INPUT_FILE" ]]; then
            echo "$INPUT_FILE exists."
          else
            echo "$INPUT_FILE does not exist."
            exit 1
          fi
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '21'
      - name: Download validator
        run: curl -L "https://github.com/itplr-kosit/validator/releases/download/v$VALIDATOR_VERSION/validator-$VALIDATOR_VERSION-distribution.zip" --output validator.zip
      - name: Download configuration
        run: curl -L "https://github.com/itplr-kosit/validator-configuration-xrechnung/releases/download/release-2023-11-15/validator-configuration-xrechnung_3.0.1_2023-11-15.zip" --output validator-configuration.zip
      - name: Unzip validator
        run: unzip -n validator.zip "$VALIDATOR_JAR_FILE"
      - name: Unzip configuration
        run: unzip -n validator-configuration.zip
      - name: Run Validator
        id: validator
        run: java -jar $VALIDATOR_JAR_FILE -s scenarios.xml -r ${PWD} -h $INPUT_FILE
      - name: Upload report if failed
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: report
          path: "*-report*"
```
<!-- markdownlint-enable MD013 -->

Here is an example of a validation step for a valid invoice.

<!-- markdownlint-disable MD013 -->
```console
$ java -jar $VALIDATOR_JAR_FILE -s scenarios.xml -r ${PWD} -h $INPUT_FILE
  shell: /usr/bin/bash -e {0}
  env:
    INPUT_FILE: ./invoice-valid.xml
    VALIDATOR_VERSION: 1.5.0
    VALIDATOR_JAR_FILE: validationtool-1.5.0-standalone.jar
    JAVA_HOME: /opt/hostedtoolcache/Java_Zulu_jdk/21.0.2-13/x64
    JAVA_HOME_21_X64: /opt/hostedtoolcache/Java_Zulu_jdk/21.0.2-13/x64
KoSIT Validator version 1.5.0
Loading scenarios from  file:///home/runner/work/xrechnung-validator-workflow/xrechnung-validator-workflow/scenarios.xml
Using repository  file:///home/runner/work/xrechnung-validator-workflow/xrechnung-validator-workflow/

Loaded "Validator Configuration XRechnung 3.0.1" by Coordination Office for IT Standards (KoSIT) from 2023-11-14
The following scenarios are available:
  * EN16931 XRechnung (UBL Invoice)
  * EN16931 XRechnung Extension (UBL Invoice)
  * EN16931 XRechnung (UBL CreditNote)
  * EN16931 XRechnung (CII)
  * EN16931 XRechnung Extension (CII)
  * EN16931 (UBL Invoice)
  * EN16931 (UBL CreditNote)
  * EN16931 (CII)


Processing of 1 objects started
Processing of 1 objects completed in 309ms
Results:
----------------------------------------------------------------------------------------------------------------
|File                                                        |Schema |Schematron|Acceptance|Error/Description   |
|/home/runner/work/xrechnung-validator-workflow/xrechnung-...|   Y   |    Y     |ACCEPTABLE|                    |
|idator-workflow/./invoice-valid.xml                         |       |          |          |                    |
----------------------------------------------------------------------------------------------------------------
Acceptable:  1  Rejected:  0


##############################
#   Validation successful!   #
##############################
```
<!-- markdownlint-enable MD013 -->

And also an example of a validation step
for an invalid invoice (no issue date).

<!-- markdownlint-disable MD013 -->
```console
$ java -jar $VALIDATOR_JAR_FILE -s scenarios.xml -r ${PWD} -h $INPUT_FILE
  shell: /usr/bin/bash -e {0}
  env:
    INPUT_FILE: ./invoice-invalid.xml
    VALIDATOR_VERSION: 1.5.0
    VALIDATOR_JAR_FILE: validationtool-1.5.0-standalone.jar
    JAVA_HOME: /opt/hostedtoolcache/Java_Zulu_jdk/21.0.2-13/x64
    JAVA_HOME_21_X64: /opt/hostedtoolcache/Java_Zulu_jdk/21.0.2-13/x64
KoSIT Validator version 1.5.0
Loading scenarios from  file:///home/runner/work/xrechnung-validator-workflow/xrechnung-validator-workflow/scenarios.xml
Using repository  file:///home/runner/work/xrechnung-validator-workflow/xrechnung-validator-workflow/

Loaded "Validator Configuration XRechnung 3.0.1" by Coordination Office for IT Standards (KoSIT) from 2023-11-14
The following scenarios are available:
  * EN16931 XRechnung (UBL Invoice)
  * EN16931 XRechnung Extension (UBL Invoice)
  * EN16931 XRechnung (UBL CreditNote)
  * EN16931 XRechnung (CII)
  * EN16931 XRechnung Extension (CII)
  * EN16931 (UBL Invoice)
  * EN16931 (UBL CreditNote)
  * EN16931 (CII)


Processing of 1 objects started
Processing of 1 objects completed in 156ms
Results:
--------------------------------------------------------------------------------------------------------------------------------------------------------
|File                                                        |Schema |Schematron|Acceptance|Error/Description                                           |
|/home/runner/work/xrechnung-validator-workflow/xrechnung-...|   N   |    Y     |  REJECT  |cvc-datatype-valid.1.2.1: '' is not a valid value for 'date'|
|idator-workflow/./invoice-invalid.xml                       |       |          |          |.;cvc-complex-type.2.2: Element 'cbc:IssueDate' must have no|
|                                                            |       |          |          | element [children], and the value must be valid.           |
--------------------------------------------------------------------------------------------------------------------------------------------------------
Acceptable:  0  Rejected:  1


##############################
#     Validation failed!     #
##############################
Error: Process completed with exit code 1.
```
<!-- markdownlint-enable MD013 -->

As you can see, the workflow isn't complicated.
All the work is offloaded to CI.
It's easier to make changes in the repository
than at each developer's local environment.

Implementing a validator workflow for the XRechnung format using GitHub Actions
removes the need for manual environment setup on local machines,
speeding up the validation process and improving team collaboration.

That's it.
I just wanted to
[share this](https://github.com/torrocus/xrechnung-validator-workflow).
