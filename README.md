# Simplified CQL Runner

An educational web-based IDE for Clinical Quality Language (CQL) development and testing. Built for learning CQL fundamentals with a focus on clinical reasoning. Based on the original [CQL Runner](https://github.com/DBCG/cql_runner) by the Da Vinci Clinical Quality Framework team. Adapted for the evolving CQL ecosystem. 

## 🚀 Live Demo

**Production**: [https://enhanced.hopena.info/cql-runner/](https://enhanced.hopena.info/cql-runner/)

## ✨ Features

- **🔧 Real-time Evaluation** - Instant feedback for CQL expressions
- **📚 Educational Examples** - Working examples of CQL data types and concepts
- **🎯 Adapted to Current CQL environment** - Restores expected $cql operator behavior
- **⏰ DateTime Precision Preservation** - Maintains hour/minute precision for accurate clinical timing
- **📋 Pre-loaded Test Data** - CMS138 tobacco cessation measure with 45 test patients

## 🎓 For Learning

This tool is recommended for:
- **CQL newcomers** learning language fundamentals
- **Educators** teaching healthcare data standards
- **Healthcare informaticians** exploring clinical reasoning
- **eCQM developers** testing performance measurement

## 🚀 Quick Start

1. **Open the app**: Navigate to the live demo URL
2. **Try examples**: Click "Examples" → "CQL Types" to see working examples
3. **Configure**: Click "Config" to set your CQL engine endpoint
4. **Start coding**: Write CQL expressions and see instant results!

### Default Configuration
- **CQL Engine**: `https://enhanced.hopena.info/fhir/$cql`
- **Test Patient**: `2412ad6a-fce0-4ad0-b200-737e443e5278` (from CMS138 tobacco cessation measure)

## Technical Implementation Notes

This implementation includes some enhancements developed while exploring the CQL toolchain:

### Parameter Processing Enhancement
During our experimentation with the clinical-reasoning framework, we encountered a scenario where the `$cql` operation expected both `content` and `expression` parameters, while some educational use cases benefit from submitting just a CQL library (`content` parameter) to evaluate all defined expressions. We modified R4CqlExecutionService.java to support this pattern, which helps maintain compatibility with existing CQL learning workflows.

### DateTime Precision Refinement  
We also addressed a precision handling case in the CQL-to-FHIR conversion process where HOUR and MINUTE precision DateTime values were being mapped to DAY precision. This involved a small adjustment to the `BaseFhirTypeConverter.toFhirPrecision()` method of https://github.com/cqframework/clinical_quality_language to preserve clinical timing precision. 

### Implementation Branches
These exploratory changes are maintained in specific branches:
- **clinical_quality_language**: `fix-datetime-precision-loss` branch of https://github.com/dhes/clinical_quality_language
- **clinical-reasoning**: `fix-cql-content-parameter` branch of https://github.com/dhes/clinical-reasoning
- **Integration**: Custom HAPI server configuration

### Community Context
These modifications represent our small contribution to the ongoing evolution of the CQL ecosystem. The core clinical-reasoning framework continues to be actively developed by many talented teams, and we're grateful for the solid foundation they provide. As healthcare standards transition to FHIR/CQL implementations, having multiple people experimenting with and contributing to these tools helps ensure robust, reliable systems for clinical reasoning.

Our approach has been to work alongside the existing ecosystem rather than replace any components, ensuring compatibility while addressing specific educational and precision requirements we encountered.

## 📊 Test Data

The runner includes test data from **CMS138 Tobacco Use Screening and Cessation** (QI Core v6.0.0) with 45 test patients covering various clinical scenarios. Each patient represents different test cases for quality measure development.

<details>
<summary>View all 45 test patient IDs</summary>

```
2412ad6a-fce0-4ad0-b200-737e443e5278  # NUM2Pass-RecievedTobaccoCessation6MonthsPriorMP
baba5342-649a-41f7-bb48-68e76dac1b82  # NUM2Pass-TobaccoAbuseCounseling
fb5b6d6f-fbe8-415b-a101-9d8990fa511e  # DEN1EXFail-HospiceAfterMP
4adf2e8c-0370-461c-be27-7b00efffff32  # IPFail-Age12SeenForOneVisitsDuringMP
... (view patientId-note.csv for complete list)
```
</details>

## 🔧 Development

### Prerequisites
- [Node.js/NPM](https://nodejs.org/en/)
- Angular CLI: `npm install -g @angular/cli`

### Local Development
```bash
# Clone the repository
git clone https://github.com/dhes/simplified-cql-runner.git
cd simplified-cql-runner

# Install dependencies
npm install

# Start development server
npm start
# Navigate to http://localhost:4200/
```

### Build for Production
```bash
ng build --prod
```

## 💡 Known Issues

- **Library Resolution**: If you encounter library resolution errors, try changing the library version number
- **Complex Collections**: List and tuple display may not render perfectly (educational examples focus on working data types)

## 🔄 What's "Simplified"?

The configuration screen of the original CQL Runner allowed different urls for the CQL Engine, Source Data, Terminology Service and Library Repository. This version requires all of those resource to be present on the CQL Engine endpoint. 

## 🏥 Clinical Context

Perfect for exploring **eCQM development patterns**:
- Boolean measure results (patient meets criteria)
- Clinical timing and date calculations
- FHIR resource querying
- Quality measure logic testing

## 📝 License

This project maintains the same open-source license as the original CQL Runner.

## 🙏 Acknowledgments

Based on the original [CQL Runner](https://github.com/DBCG/cql_runner) by the Da Vinci Clinical Quality Framework team. Enhanced for educational use with simplified interface and precision fixes.

---

**Happy CQL coding!** 🎉