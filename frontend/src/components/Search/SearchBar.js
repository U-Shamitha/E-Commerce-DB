import React, { useState } from 'react';
import classes from './searchBar.module..css'; // Import the generated CSS file
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faIdCard, faSearch, faSortNumericUp, faTags } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange, setProductBrand, setProductCategory, setProductName, setQuantity, setRatingRange, setSortOption } from '../../redux/filterOptionsSlice';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCatSearchTerm] = useState('');
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [quantity, setQuantityValue] = useState(0);

  const dispatch = useDispatch();

  const options = [
    { value: {start:null, stop:99}, label:'below $100'},
    { value: {start:100, stop:199}, label: '$100-$199' },
    { value: {start:200, stop:299}, label: '$200-$299' },
    { value: {start:300, stop:399}, label: '$300-$399' },
    { value: {start:400, stop:499}, label: '$400-$499' },
    { value: {start:500, stop:599}, label: '$500-$599' },
    { value: {start:600, stop:699}, label: '$600-$699' },
    { value: {start:700, stop:799}, label: '$700-$799' },
    { value: {start:800, stop:899}, label: '$800-$899' },
    { value: {start:900, stop:999}, label: '$900-$999' },
    { value: {start:1000, stop:null}, label:'above $999'},
  ];
  const [unselectedOptions, setUnselectedOptions] = useState(options);
  // console.log(options)
  // console.log(unselectedOptions)

  const [selectedOptions, setSelectedOptions] = useState([]);

  const sortOptions = [
    { value:null, label:'None'},
    { value: 'title', label:'Name'},
    { value: 'category', label:'Category'},
    { value: 'brand', label:'Brand'},
    { value: 'price', label:'Price'},
    { value: 'rating', label:'Rating'},
    { value: 'stock', label:'AvaialbleQuantity'},
  ];
  const [selectedSortOption, setSelectedSortOption] = useState();

  const ratingOptions = [
    { value: {start:0}, label:'none'},
    { value: {start:1}, label:'1 and above'},
    { value: {start:1.5}, label:'1.5 and above'},
    { value: {start:2}, label:'2 and above'},
    { value: {start:2.5}, label:'2.5 and above'},
    { value: {start:3}, label:'3 and above'},
    { value: {start:3.5}, label:'3.5 and above'},
    { value: {start:4}, label:'4 and above'},
    { value: {start:4.5}, label:'4.5 and above'},
  ];
  const [selectedRatingOption, setSelectedRatingOption] = useState();


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '250px', 
      color: 'black',
      fontSize: '14px',
      borderColor: state.isFocused ? '#3abbf7' : '#cbd5e0',
    }),
    menu: (provided) => ({
      ...provided,
      width: '250px',
      color:'black',
      fontSize: '14px',
    }),
  };

   // Handle search term change
   const handleSortOptionChange = (sortOption) => {
    setSelectedSortOption(sortOption);
    dispatch(setSortOption(sortOption));
  };

  // Handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setProductName(e.target.value));
  };

  // Handle product category change
  const handleCatSearchTermChange = (e) => {
    setCatSearchTerm(e.target.value);
    dispatch(setProductCategory(e.target.value));
  };

  // Handle product brand change
  const handleBrandSearchTermChange = (e) => {
    setBrandSearchTerm(e.target.value);
    dispatch(setProductBrand(e.target.value));
  };

  // Handle category change
  const handleCategoryChange = (selectedCategories) => {
    setSelectedOptions(selectedCategories);
    dispatch(setPriceRange(selectedCategories));
    options.filter(
      (option) => !selectedCategories.some((selected) => selected.value === option.value)
    );
  };

  // Handle rating change
  const handleRatingChange = (selectedRating) => {
    setSelectedRatingOption(selectedRating);
    dispatch(setRatingRange(selectedRating));
  };

    // Handle rating change
    const handleQuanityChange = (e) => {
      setQuantityValue(e.target.value);
      dispatch(setQuantity(e.target.value));
    };
  

  return (
    <div className="container" >
      <form className={classes.searchForm}>
        <div className="flex gap-5 flex-col sm:justify-evenly items-stretch sm:items-center space-y-4 sm:space-y-0">

          {/* Sort Products */}
          <div className='flex gap-5 items-center'>
            <div>
              <Select
                options={sortOptions}
                value={selectedSortOption}
                onChange={handleSortOptionChange}
                placeholder="Sort Products"
                styles={customStyles}
              />
            </div>
          </div>

          {/* Price filter */}
          <div className='flex gap-5 items-center'>
            <div>
              <Select
                isMulti
                options={unselectedOptions}
                value={selectedOptions}
                onChange={handleCategoryChange}
                closeMenuOnSelect={false}
                // isSearchable={false}
                hideSelectedOptions={true} 
                placeholder="Price Range"
                styles={customStyles}
              />
            </div>
          </div>

          {/* Rating filter */}
          <div className='flex gap-5 items-center'>
            <div>
              <Select
                options={ratingOptions}
                value={selectedRatingOption}
                onChange={handleRatingChange}
                placeholder="Rating Filter"
                styles={customStyles}
              />
            </div>
          </div>
          
          {/* Search By Name */}
          <div className='relative w-[100%]'>
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="p-2 border border-gray-300 rounded pl-10 w-3/4 sm:w-full"
          />
          <FontAwesomeIcon icon={faIdCard} className="absolute left-3 top-3 text-gray-500 search-icon" />
          </div>

          {/* Search By Category */}
          <div className='relative w-[100%]'>
          <input
            type="text"
            placeholder="Search Category"
            value={categorySearchTerm}
            onChange={handleCatSearchTermChange}
            className="p-2 border border-gray-300 rounded pl-10 w-3/4 sm:w-full"
          />
          <FontAwesomeIcon icon={faFolder} className="absolute left-3 top-3 text-gray-500 search-icon" />
          </div>

          
          {/* Search By Brand */}
          <div className='relative w-[100%]'>
          <input
            type="text"
            placeholder="Search Brand"
            value={brandSearchTerm}
            onChange={handleBrandSearchTermChange}
            className="p-2 border border-gray-300 rounded pl-10 w-3/4 sm:w-full"
          />
          <FontAwesomeIcon icon={faTags} className="absolute left-3 top-3 text-gray-500 search-icon" />
          </div>

          {/* Quantity filter */}
          <div className='relative w-[100%]'>
            <div>
              <input 
                type='number'
                placeholder='Quantity Filter' 
                step={1} 
                min={0} 
                onChange={handleQuanityChange}
                className="p-2 border border-gray-300 rounded pl-10 w-3/4 sm:w-full"
              />
              <FontAwesomeIcon icon={faSortNumericUp} className="absolute left-3 top-3 text-gray-500 search-icon" />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default SearchBar;